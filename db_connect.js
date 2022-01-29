// esversion:6
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "user",
    password: "7149",
    database: "db"
})

module.exports = connection;