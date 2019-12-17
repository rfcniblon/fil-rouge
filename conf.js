const mysql = require("mysql");


const connection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"XXXXXXX",
        database:"tim_burton"
    }
);


module.exports = connection;
