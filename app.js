const express = require("express");
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const  sequelize_connection  = require("./sequelize_connection");

const port = process.env.PORT || 3000;
const app = express();

//node middleware
app.use(express.json());

require('./config/passport_conf')(passport);


//connect to database sever automatically available to all routes
sequelize_connection.authenticate()
.then(() => {
    console.log('Connection has been established successfully');
    User.sync({force: true});
});


//Express session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());


//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



//start server
app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});


