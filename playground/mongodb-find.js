const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the server');
  }
  console.log('Connected to MongoDB server');

  // //find doesnt return documents but the coursor to them, provides also set of methods
  // //db.collection('Todos').find().toArray().then((docs) => {
  // //db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  // db.collection('Todos').find({
  //   //in order to find by id we need to use object deconstructor described in mongodb-connect.js file
  //   //as id is not a string
  //   // _id: '5957d79094114d05e0eee301'
  //   _id: new ObjectID('5957d79094114d05e0eee301')
  // }).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // //replacement of .toArray into .count
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  db.collection('Users').find({name: 'Maciej'}).toArray().then((docs) => {
    console.log("Finding users with name Maciej");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('User Maciej could not be found');
  });


  // db.close();
});
