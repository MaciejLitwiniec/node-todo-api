const MongoClient = require('mongodb').MongoClient;

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

  db.collection('Users').insertOne({
    name: 'Maciej',
    age: 29,
    location: 'Warsaw'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert Users', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  //close connection with server
  db.close()
});
