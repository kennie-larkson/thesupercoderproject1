const jwt = require('jsonwebtoken');
const {pubSecret}  = require('./secret');


module.exports = function(payload) {
    try {
        return new Promise((resolve, reject) => {

            jwt.sign( payload, pubSecret, {expiresIn: 300} ,( err, token)=>{
                
                resolve(token);
            });
    
        });
    } catch (err) {
        console.error(`Oops! Error generating token: ${err.message}`)
    }
    

}

// const tokenize = (payload) => {

//     try {
//         return new Promise((resolve, reject) => {

//             jwt.sign( payload, pubSecret, {expiresIn: 180 }, ( err, token)=>{
                
//                 resolve(token);
//             });
    
//         });
//     } catch (err) {
//         console.error(`Oops! Error generating token: ${err.message}`)
//     }
    
// }

// module.exports =  tokenize;


