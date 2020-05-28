const { User } = require("./User");
const { sequelize_connection } = require("./sequelize_connection");
const express = require("express");
const passport = require("passport");
const port = process.env.PORT || 3000;
const app = express();

//middlewares
app.use(express.json());            // to get data from the client side through the req.body object


//ROUTES : using POSTMAN as client side
app.get("/", (req,res)=>{

    res.json({status: "success"});
    // try {

        // res.json({status: "success"});

    //     await sequelize_connection.authenticate();
    //     console.log('Connection has been established successfully');


    //     (async ()=> {
    //         // await Article.sync({force: true});
    //         await User.sync();
    //         await User.create({
    //             email: "This is the second title",
    //             password: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    //         });
    //         const entries = await User.findAll();
    //         console.log( entries.map(entry => entry instanceof User));
    //         console.log(`All Users: ${JSON.stringify(entries,null,2)}`);
    //         res.json(entries);
    //     })();
    //     console.log('The table for the User model was just (re)created!');


    // } catch (err) {
    //     console.error('Unable to connect to the database server:',err.message);
        
    // } 
       
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

        
        res.json(req.body);
        
        
    } catch (err) {
        console.error(err.message);
        
    }
  
});

app.get("/data", async (req,res)=>{
    
    try {
        
       res.json(req.body);
       console.log(req.body);

    } catch (err) {
        console.error(err.message);
        
    }   
   
});

app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});