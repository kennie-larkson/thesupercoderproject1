const express = require("express");
const jwt = require('jsonwebtoken');
const { User } = require("./user");
const { sequelize_connection } = require("./sequelize_connection");
const secret = require('./secret');
const port = process.env.PORT || 3000;
const app = express();

//node middleware
app.use(express.json());

//routes
app.post('/user/signup', async(req,res)=>{
    try {
        const payload = {
            email: req.body.email,
            password: req.body.password
        };
        const {email, password} = payload;

        await sequelize_connection.authenticate();
        console.log('Connection has been established successfully');

        const db_user = await User.findOne({
            where:{
                user_email: email
            }
        });

        if(db_user){
            res.json({
                error: "User already exists."
            });
        }
        await User.sync();
        await User.create({
            user_email: email,
            user_password: password
        });

        jwt.sign({payload}, secret, (err, token)=>{
            res.json({
                session: token
            });
        });




        
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});