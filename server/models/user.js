const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// {
//   email: 'asdfg@mail.com',
//   password: 'sdfghjklxcvbnmdfghjkcvbn',
//   tokens: [{
//     access: 'auth',
//     token: 'dfghjkxtrcyvubnimrxetcyvbu'
//   }]
// }

//restructored from original model to be able to use custom methods
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


//overriden method
//defines what is sent back when a mongoose model is transformed into JSON
UserSchema.methods.toJSON = function() {
  var user = this;
  //toObject is taking mongoose user variable and converting into object with properties available on a document
  var userObject = user.toObject();

  //this way things like passwprd will not be returned
  return _.pick(userObject, ['_id', 'email']);
};

//custom method
//.methods - everything you add onto it turns into instance methods
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  //filling out user tokens array using ES6 syntax
  user.tokens.push({access, token});

  //'return' so server.js can access it
  //save to db, and further processing the token
  return user.save().then(() => {
    return token;
  });
};

//.statics - everything you add onto it turns into model methods
//unlike the other methods it takes an argument 'token' with which will search
//Model methods are called with Uppercase: User object
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  //by adding return we will be able to chain '.then' when calling the findByToken method
  //we use 'tokens.token' to query nested document (when . is in a key)
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//'mongoose middleware' allows run certain code before or after particular event
UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = {User};
