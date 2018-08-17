var http = require('http');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('./employee.json');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var url = "mongodb://localhost:27017/productDB";

//sending the data to database from file
/*
var exp = app.get('/rest/api/get', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("productDB");
        var myobj = data;
        dbo.collection("employee").insert(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});*/

var exp = app.get('/rest/api/get', (req, res) => {
    MongoClient.connect(url, function (err, dbvar) {
        if (err) throw err;
        var coll = dbvar.db("productDB");

        coll.collection("employee").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            dbvar.close();
        });
    });
});

var exp = app.get('/rest/api/get/:stateName', (req, res) => {
    var state = req.params.stateName;
    MongoClient.connect(url, function (err, dbvar) {
        if (err) throw err;
        var coll = dbvar.db("productDB");

        coll.collection("employee").find({ "empAddress.state": state }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            dbvar.close();
        });
    });
});

var exp = app.put('/rest/api/put/:empID/:cityName', (req, res) => {

    var id = req.params.empID;
    var city = req.params.cityName;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var coll = db.db("productDB");
        var myquery = JSON.parse('{ "empId":' + parseInt(id) + '}');
        var newvalues = { $set: { "empAddress.city": city } };
        console.log(newvalues);
        coll.collection("employee").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });

        coll.collection("employee").find({}).toArray(function (err, result) {
            if (err) throw err;
            fs.writeFileSync('employee.json', JSON.stringify(result));
            db.close();
        });

    });

});

app.use(bodyParser.json());
var exp = app.post('/rest/api/post', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("productDB");
        var myobj = req.body;
        dbo.collection("employee").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            data.push(req.body);
            fs.writeFileSync('employee.json', JSON.stringify(data));
            db.close();
        });
    });
});


exp.listen(3002, () => console.log());



