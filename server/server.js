var mongoose = require('mongoose');

//to 'inform' mongoose that we will use JS built-in Promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


//so the mongoose knows how to store data
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});
//
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


var newerToDo = new Todo({
  text: 'walk the dog',
  completed: true,
  completedAt: 123
});

newerToDo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('unable to save todo', e);
});
