const jwt = require('jsonwebtoken');
const User = require('./user');

const auth = async (req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, 'SomeExposedSecretKey');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        req.token = token;
        req.user = user;
        next();
        
    } catch (err) {
        console.error(`Oops! Authentication failed: ${err.message}`);
        
    }

}

module.exports = auth;