require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
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
app.get('/todos/:id', authenticate, (req, res) => {
  //req.params provides an object with key value pairs
  //where id is a key and what was delivered in URL will be a value
  //res.send(req.params);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  //Todo.findById(id).then((todo) => {
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(404).send());
});

//1. add authentication
//2. update query
//3. update test cases
app.delete('/todos/:id', authenticate, (req, res) => {
  //get the id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //remove todo by id
  //Todo.findByIdAndRemove(id).then((todo) => {
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send());
});


//http PATCH to update resource
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  //lodash function to decide which properties user can update
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  //$set is mongodb operator
  //'new' comes from mongoose
  //Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
});

//http POST /users
//SIGN IN
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  //Model methods & Instance methods
  //Model methods are called with Uppercase: User object
  //Instance methods are called with lower case: individual user

  user.save().then(() => {
    //res.send(user);
    //generateAuthToken is responsible for adding a token to individual user doc
    return user.generateAuthToken();
  }).then((token) => {
    //sending token in http header
    //header is key-value pair
    //when header is prefixed with x- it tells its a custome header
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

//first private route with middleware 'authenticate'
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    //res.send(user);
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

//deleting token of currently logged user
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


module.exports = {app};
