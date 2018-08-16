var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var exp = app.use(bodyParser.json());
var exp = app.post('/rest/api/post', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.status(201);
    res.send("Username : " + req.body["username"] + " Password :  " + req.body["password"]);
});

exp.listen(3001, () => console.log("Running"));

/*
    Request body should be like :
    {
        "username":"uname",
        "password":"password"
    }
*/