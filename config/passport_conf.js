const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const   User   = require('../models/user');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');


module.exports =  function(passport, req) {
    
    passport.use (  
        new LocalStrategy( { usernameField: 'username'}, ( username, password, done) => {
            //Match User
            User.findOne( {username})
            .then( user => {
                if(!user){
                    console.log('LocalStrategy errmsg: User does not exist');
                    return done(null, false, {message: 'The user does not exist'});
                }

                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) { console.log('bcrypt err');}
                    if(isMatch){
                        console.log('bcrypt msg: password is a match');
                        return done(null, user);
                    }else{
                        console.log('bcrypt msg: password is not a match');
                        return done(null, false, {message: 'Pasword incorrect'});
                    }
                });
            })
            .catch( err => console.log( err));
        }
             ));

             passport.serializeUser((user, done) => {
                 done(null, user.id);
             });

             passport.deserializeUser((id, done) => {
                 User.findById(id, (err, user) => {
                     done(err, user);
                 });
             });
            
}
     