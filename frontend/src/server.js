const express = require ("express");
const mysql = require('mysql');
const cors = require('cors');
const { default: SignUp } = require("./assets/pages/Signup");

const app = express();
app.use(cors());

const db = mysql.createConnection({

host:'localhost' ,
user:"root" ,
password: "" ,
database:SignUp


})

app.post('/Signup',(req,res)=> =>{
    const sql = "INSERT INTO login('name','email','password') VALUES (?)";
    const values={
        req.body.name,
        req.body.email,
        req.body.password
    }
 
db.query(sql,[values],(err ,data)=> {
   if(err){
     return res.json("Error");
   }

   return res.json(data);
})
  
})


app.listen(8081,()=>{
      console.log("listening");
})
