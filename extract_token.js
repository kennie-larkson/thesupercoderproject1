const jwt = require('jsonwebtoken');


module.exports = async (req,res,next)=>{
    //TOKEN FORMAT
    //Authorization: Bearer <access_token>
    // req.headers['authorization'] = `Bearer ${tokStr}`;
    try {
        //Get the auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //Get Token from array
        const bearerToken = bearer[1];
        //Set the Token
        req.token = bearerToken;
        // return token;
        next();
    }else{
        //Forbidden
        res.sendStatus(403).send({message: 'Please make sure your request has an authorization header'});
    }
    
        
    } catch (err) {
        console.error('Error verifying token: '+err.message);
        
    }

}

// exports.verifyToken = verifyToken;
// module.exports = extractToken;