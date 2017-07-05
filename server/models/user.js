var mongoose = require('mongoose');


var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


// var newUser = new User({
//   email: ' test@test.com '
// });
//
// newUser.save().then((usr) => {
//   console.log('New user saved to DB', usr);
// }, (e) => {
//   console.log('Unable to save user');
// })

module.exports = {User};
