const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the server');
  }
  console.log('Connected to MongoDB server');

  // //deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) =>{
  //   console.log(result);
  // });

  // //deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });


  // //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // //look for any duplicates => name, use deleteMany
  // db.collection('Users').deleteMany({name: 'Maciej'}).then((result) => {
  //   console.log(result);
  // });

  //find one and delete, doesnt matter which one, but should be deleted by ID
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5957d91db1e628203021d9a4'
  )}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // db.close();
});
