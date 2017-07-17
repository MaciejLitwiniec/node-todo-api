//we will use it to validate object id
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// //mongoose
// //Todo.remove - Works like Todo.find
// //in this case removes all
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove()
Todo.findOneAndRemove({_id: '596ce3d6ddf4e4b9c0b38bc6'}).then((todo) => {
  console.log(todo);
});

//Todo.findByIdAndRemove()
Todo.findByIdAndRemove('596ce3d6ddf4e4b9c0b38bc6').then((todo) => {
  console.log(todo);
});
