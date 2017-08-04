var mongoose = require('mongoose');

//Model - so the mongoose knows how to store data
//we utilize mongoose schemas and validators
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    //trim deletes spaces at the beginning and end of String
    //validates if String is not composed of spaces only
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


//create new user with email property and without
//user should showup in Users collection

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// //saving with premise
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// var newerToDo = new Todo({
//   text: 'walk the dog',
//   //completed: true,
//   //completedAt: 123
// });
//
// newerToDo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('unable to save todo', e);
// });


module.exports = {Todo};
