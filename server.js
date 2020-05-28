const { Article } = require("./Article");
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
app.get("/", async (req,res)=>{

    try {

        // res.json({status: "success"});

        await sequelize_connection.authenticate();
        console.log('Connection has been established successfully');


        (async ()=> {
            // await Article.sync({force: true});
            await Article.sync();
            await Article.create({
                title: "This is the second title",
                body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
            });
            const entries = await Article.findAll();
            console.log( entries.map(entry => entry instanceof Article));
            console.log(`All Articles: ${JSON.stringify(entries,null,2)}`);
            res.json(entries);
        })();
        console.log('The table for the Article model was just (re)created!');


    } catch (err) {
        console.error('Unable to connect to the database server:',err.message);
        
    } 
       
});


app.post("/", async (req,res)=>{

    try {

        await sequelize_connection.authenticate();
        console.log(req.body);

        (async ()=>{
            await Article.sync();
            await Article.create({
                title: req.body.title,
                body: req.body.body
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