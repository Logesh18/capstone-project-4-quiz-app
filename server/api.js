const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port=8000;

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const connection=mysql.createConnection({
    host:'sql6.freesqldatabase.com',
    user:'sql6474167',
    password:'hby1UWFzJt',
    database:'sql6474167',
    port:3306
});

try
{
    console.log("Database connected");
    var q = "SHOW TABLES LIKE 'users'";
    connection.query(q, function (error, result) {
        if(result.length === 0)
        {
            var q = "CREATE TABLE users (username VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, PRIMARY KEY (username,email,password))";
            connection.query(q, function (error, result) {
                console.log("Table is created successfully");
            });
        }
        else{
            console.log("Table is already created");
        }
    });
}
catch(error)
{
    console.log(error);
}
app.post('/saveUser',(req,res)=>{
    var q = "INSERT INTO users (username, email, password) VALUES ("+"'"+ req.body.username+"'" +", "+"'"+req.body.email+"'"+", "+"'"+req.body.password+"'"+")";
    connection.query(q, function (error, result) {
        if (error)
        {
            console.log(error);
        }
        else
        {
            res.send("You have successfully signed up")
        }
    });
})

app.get('/getUser',(req,res)=>{
    console.log(req.query.username,req.query.password);
    var q = "SELECT password from users WHERE username="+"'"+req.query.username+"'"+" AND password="+"'"+req.query.password+"'";
    connection.query(q, function (error, result) {
        if (result.length===0)
        {
            res.send("User credentials are incorrect");
        }
        else
        {
            var token="";
            var data=JSON.stringify(result);
            if(req.query.password===JSON.parse(data)[0].password){
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for ( var i = 0; i < 8; i++ ) {
                    token += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                console.log(token);
                res.json({"token":token});
            }
        }
    });
      
})


app.listen(port,()=>console.log(`server is listening in port ${port}`));