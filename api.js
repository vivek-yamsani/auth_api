const express = require('express')
const bodyParser = require('body-parser');
var db = require('./db_connect.js');

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
})

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, result,) => {

    var mail = req.body.username;
    var pass = req.body.password;
    var stmt = 'SELECT * FROM `user_details` WHERE `mail`= ? AND `password`= MD5(?) ;';
    stmt = db.format(stmt, [mail, pass]);
    console.log(stmt);
    db.query(stmt, (err, res, fields) => {
        if (err) {
            flag = 1;
            result.status(500).json({
                "login": 400,
                "msg": "database conncetion err"
            });
            console.log(err);
            return;
        }
        const count = Object.keys(res).length;
        if (count == 1) {
            result.status(200).json({
                "login": 200,
                "msg": "succesfully loged in"
            })
        }
        else {
            result.status(200).json({
                "login": 400,
                "msg": "username is un_registered or invaild password/username"
            })
        }
    });
});



app.post('/signup', (req, result) => {
    var mail = req.body.username;
    var pass = req.body.password;
    var stmt = 'SELECT * FROM `user_details` WHERE `mail`= ? ;';
    stmt = db.format(stmt, [mail]);
    console.log(stmt);
    var flag = 0;
    db.query(stmt, (err, res, fields) => {
        if (err) {
            flag = 1;
            result.status(500).json({
                "signup": 400,
                "msg": "database query failed"
            })
            console.log(err);
            return;
        }
        var count = Object.keys(res).length;
        if (count != 0) {
            flag = 1;
            result.status(200).json({
                "signup": 400,
                "msg": "username is already registered"
            })
        }
        else {
            que();
        }
        // console.log("q1 ended..");
    });

    function que() {

        stmt = "INSERT INTO `user_details` SET `mail`= ? , `password`=MD5(?) ;";
        stmt = db.format(stmt, [mail, pass]);
        console.log(stmt);
        db.query(stmt, (err, res) => {
            console.log("insert exec..");
            if (err) {
                result.status(500).json({
                    "signup": 400,
                    "msg": "database query failed"
                })
                console.log(err);
                return;
            }
            console.log(res);
            result.status(200).json({
                "signup": 200,
                "msg": "Succesfully registered"
            })
        })
    }
    // })
})

app.post('/update', (req, result) => {
    var mail = req.body.username;
    var pass = req.body.password;
    var new_pass = req.body.new_password;
    var stmt = "UPDATE `user_details` SET `mail` = ?,`password` = MD5(?)  WHERE `mail` = ? AND `password` = MD5(?)";
    stmt = db.format(stmt, [mail, new_pass, mail, pass]);
    db.query(stmt, (err, res) => {
        if (err) {
            result.status(500).json({
                "signup": 400,
                "msg": "database query failed"
            })
            console.log(err);
            return;
        }
        var count = res.affectedRows;
        console.log(res);
        if (count == 0) {
            result.status(400).json({
                "update": 400,
                "msg": "invalid password/username"
            })
        }
        else {
            result.status(200).json({
                "update": 200,
                "msg": "succesfully updated the password "
            })
        }
    })
})

app.listen(3000, console.log("server listening at 3000..."));