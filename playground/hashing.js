const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10).then((salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});
    
var hashed1 = '$2a$10$L/OmYbfOlSYzBitcqdzWJetkFIbTU7aKq2GBjSyiAkkfpYq.j.U/K';
var hashed2 = '$2a$10$XTif4Jz55JJJh5x/zLIQm.fFcBNyjPCGLxiemqIfRI4RF8wCYTac2';

bcrypt.compare(password, hashed2, (err, res) => {
    if(res){
        console.log('The values match!');
    }
    else{
        console.log('The values do not match.  DON\'T TRUST!');
    }
});

// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecrt').toString();

// if(resultHash === token.hash){
//     console.log('Data has not been changed');
// } else {
//     console.log('Data was changed.  Do not trust');
// }