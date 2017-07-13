const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '595d32e3953caf2d9c983afe';

//returns array
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

//returns document
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});
