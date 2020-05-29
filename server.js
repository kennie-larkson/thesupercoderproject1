const { User } = require("./User");
const { sequelize_connection } = require("./sequelize_connection");
const express = require("express");
// const cors = require('cors') ;
const passport = require("passport");
const port = process.env.PORT || 3000;
const app = express();

//middlewares
app.use(express.json());            // to get data from the client side through the req.body object
const postData = [];


//ROUTES : using POSTMAN as client side
app.post("/user/signup", async (req,res)=>{

    let user_email= req.body.email, user_password = req.body.password;
    try {
        if(user_email === "" || user_password === ""){
            res.send('Oops! please check that the required fields are properly entered');
        }

        res.sendStatus(200);

        await sequelize_connection.authenticate();
        console.log('Connection has been established successfully');

        (async ()=> {
            // await User.sync({force: true});
            await User.sync();
            await User.create({
                user_email: user_email,
                user_password: user_password
            });
            const user = await User.findByCredentials(user_email, user_password);
            const token = await User.generateAuthToken();
            res.send({user, token});
            
        })();
        console.log('The table for the User model was just (re)created!');


    } catch (err) {
        console.error('Unable to connect to the database server:',err.message);
        
    } 
       
});


app.post("/", async (req,res)=>{

    try {

        await sequelize_connection.authenticate();
        console.log(req.body);

        (async ()=>{
            await User.sync();
            await User.create({
                email: req.body.email,
                password: req.body.password
            });

            res.send('Post received');
            res.end();
        })();
        
        
    } catch (err) {
        console.error(err.message);
        
    }
    
       
});

app.post("/data", async(req,res)=>{

    try {

        // clientData = req.body;
        postData.push(req.body)
        console.log(postData[0]);
        res.json(postData[0]);
        
        
    } catch (err) {
        console.error(err.message);
        
    }
  
});

app.get("/data", async (req,res)=>{
    
    try {
        
       res.json(postData[0]);

    } catch (err) {
        console.error(err.message);
        
    }   
   
});

app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});