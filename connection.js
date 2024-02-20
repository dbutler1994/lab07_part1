const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "web_dev",
    port : "3306"
});

dbConnection.connect((err) =>{
    if(err) throw err;
});

module.exports = dbConnection;