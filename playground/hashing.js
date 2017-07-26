const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// PLAYGROUND PART III

var password = 'abc123!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$AHpTksEC/DX.g/kPOGTftecmcdDymECk2RWoahR2K/C/nDPYSp/Jq';

//res returns false if password doesnt match and true if it is
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


//======================================================================

// PLAYGROUND PART II
//takes and object (user id) with secret and signs it (creating hash), then returns token
//jwt.sign

//takes token and secret and makes sure that data was not manipulated
//jwt.verify
//
// var data = {
//   id: 10
// }
// // this we will send to the user when he will sign up, or login
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded: ', decoded);


//======================================================================

// //PLAYGROUND PART I
//
//
// var message = "I am user number 3";
// //.toString() bo zwracany jest obiekt
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// //'hash' will be hashed value of the data
// //'somesecret' is Salting the hash
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // //man in the middle
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// //data provided by user
// //we can compare it to check if nothing was changed
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Dont trust');
// }
