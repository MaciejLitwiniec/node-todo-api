
// //ES6 functionality
// //object destructuring allows to pull out properties from object creating variables
// var user = {name: 'Maciej', age: 29};
// var {name} = user;
// console.log(name);

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    //without return program would proceed and print success message even doe
    //connection would fail, by addint return we are returning from function
    //and rest is not performed
    return console.log('Unable to connect to the server');
  }
  console.log('Connected to MongoDB server');

  // //.colleciton takes one argument - name of collection to add into
  // //.insertOne lets add a document into collection
  // //.insertOne takes to arguments, object to add and callback function
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todo', err);
  //   }
  //   //result.ops stores all the documents that were inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   //_id: '123',
  //   name: 'Maciej',
  //   age: 29,
  //   location: 'Warsaw'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Users', err);
  //   }
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   // console.log(JSON.stringify(result.ops[0]._id));
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  // });



  //close connection with server
  db.close();
});
