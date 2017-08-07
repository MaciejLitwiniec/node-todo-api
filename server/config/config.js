//used to configure development and test db environments
var env = process.env.NODE_ENV || 'development';
//console.log('environment ******', env);

if (env === 'development' || env === 'test') {
  var config = require('./config.json');

  //with env we will get development or test
  var envConfig = config[env];

  //Object.keys goes through keys and returns array
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
