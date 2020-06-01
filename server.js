const express = require("express");
const passport = require("passport");
const port = process.env.PORT || 3000;
const { User } = require("./user");
const { sequelize_connection } = require("./sequelize_connection");
const auth = require('./auth')
const app = express();

//middlewares
app.use(express.json());  // to get data from the client side through the req.body object


//ROUTES : using POSTMAN as client side
app.post("/user/signup", async (req,res)=>{
    try {
        const user_email= req.body.email, user_password = req.body.password;
        await sequelize_connection.authenticate();
        console.log('Connection has been established successfully');

        (async ()=> {
            // await User.sync({force: true});
            const user = await User.findOne({where:{user_email: user_email}});

            if(user){
                res.json({error: "User already exists."});
                res.sendStatus(400);
                
            }

            await User.sync();
            await User.create({
                user_email: user_email,
                user_password: user_password
            });
            // const user = await findByCredentials(user_email, user_password);
            const token = await user.generateAuthToken();
            res.sendStatus(200);
            res.send({user, token});

            console.log('The table for the User model was just (re)created!');
            
        })();
        


    } catch (err) {
        console.error('Unable to connect to the database server:',err.message);
        
    } 
       
});


app.post("/user/login", async (req,res)=>{

    try {
        
    } catch (err) {
        console.error(err.message);
        
    }
    
   
});




app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});