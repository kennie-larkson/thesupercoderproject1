const express = require("express");
// const cors = require('cors') ;
const passport = require("passport");
const port = process.env.PORT || 3000;
const pool = require('./db')
const app = express();

//middlewares
app.use(express.json());            // to get data from the client side through the req.body object
// app.use(cors())                    // handle cros origin request issues (third party requests)

const postData = [];

//ROUTES : using POSTMAN as client side
app.get("/",(req,res)=>{
    
    res.json({status: "success"});
       
});

app.post("/",(req,res)=>{

    try {

        console.log(req.body);
        res.send('Post received');
        res.end();
        
    } catch (err) {
        console.error(err.message);
        
    }
    
       
});

app.post("/data", async(req,res)=>{

    try {

        const {content} = req.body

        const data = await pool.query(
            "INSERT INTO data_table (content) VALUES ($1) RETURNING *",
            [content]
            );

        res.json(data.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        
    }
  
});

app.get("/data", async (req,res)=>{
    
    try {
        
       const allData = await pool.query(
           "SELECT * FROM data_table"
       );

       res.json(allData.rows);

    } catch (err) {
        console.error(err.message);
        
    }   
   
});

app.listen(port,()=>{
    console.log(`Application Server is running on port : ${port}`);
 
});