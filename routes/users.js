const express = require('express');
const router = express.Router();
const tokenize  = require('./../token_gen');
const extractToken = require('./../extract_token');
const {pubSecret} = require('./../secret');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'); 
const  User  = require("../models/user");


//User signup
router.get('/signup', (req, res) => {
    res.json({message: 'Welcome to the signup page'});
});

router.post('/signup', (req, res) => {

    const { username, password } = req.body;
    try {
        if(!username || !password) {
            // res.json({errormessage: 'Please enter all fields'});
            console.log('Please enter all fields');
        }
        if(password.length < 6) {
            // res.json({errormessage: 'Password should be atleast 6 characters'});
            console.log('Password should be atleast 6 characters');
        }
        User.findOne({
            where: {username: username}
        })
        .then((user) => {
            if(user){ 
                res.json({message: 'User already exists'}); 
            }
        
                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(password, salt, (err, hash) =>{
                        if(err) throw err;
                        hashedPassword = hash;
                        
                        User.create({
                            username,
                            password: hashedPassword
                        }).then(newUser => {
                            tokenize({username, hashedPassword}).then((token, err) =>{
                                if(err) throw err;
                                res.json({new_user: newUser.dataValues,
                                token: token});
                                // res.redirect('/user/login')
                            });
                        });
                    });
                }); 
        
        });

    } catch (err) {
        console.error(`Signup process failed: ${err.message}`);
    }

});



//User login handler
router.post('/login', extractToken, (req, res, next) => {

    jwt.verify(req.token, pubSecret, (err, decoded)=>{
                
        if(err){
            console.log(`Oops! There's an error verifying the token, ${err}`);
            res.sendStatus(403).send( 'Please make sure your request header as an authorization token');
        }
        res.json({
            status: 'You have been authenticated by passport',
            decoded: decoded,  
            permission: "Granted..."});
            console.log('Token verified...');
    });
    passport.authenticate('local', (err, user, info) => {
        if(err){ console.log('Passport authentication error', err)}
        if(!user) { console.log('Passport can\'t find user')}
        console.log(user);
    })( req, res, next);
        
             
    }

);




module.exports = router;