const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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


var User = mongoose.model('User', UserSchema);

module.exports = {User};
