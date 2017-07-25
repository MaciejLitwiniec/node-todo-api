var {User} = require('./../models/user')


var authenticate = (req, res, next) => {
  //note req.
  //'x-auth' to capture the header
  var token = req.header('x-auth')

  //will take a token from request,
  //search for this user and return the user to caller
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    //req is modified and we can access it in GET route
    req.user = user;
    req.token = token;
    next();

  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
