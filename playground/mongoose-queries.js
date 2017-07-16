//we will use it to validate object id
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var uid = '5958e2d2d3e9412d8020a088';

// var id = '595d32e3953caf2d9c983afe11';
//
// //by flipping ObjectID obtain 'when ObjectID is invalid'
// if (!ObjectID.isValid(id)) {
//   console.log('id not valid');
// }

// //returns array, or empty array
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// //returns document, or null
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// //returns document, or null
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

//challenge
//User.findById
//case: where the query works, but there is no user (like above), "user not found"
User.findById('5958e2d2d3e9412d8020a088').then((user) => {
  if (!user) {
    return console.log('user not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
