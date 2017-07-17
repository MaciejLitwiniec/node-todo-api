var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req, res) => {
  Todo.find({}).then((todos) => {
    //using {todos} (object) we are more open for future
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

//GET /todos/1234567
//:id is url pattern for dynamic resource queries
//id will be a variable created on request object
//later we wil be able to access that variable
app.get('/todos/:id', (req, res) => {
  //req.params provides an object with key value pairs
  //where id is a key and what was delivered in URL will be a value
  //res.send(req.params);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(404).send());
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


module.exports = {app};
