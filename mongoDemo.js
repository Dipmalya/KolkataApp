var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
// var data = require('./demo.json');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var app = express();
var url = "mongodb://localhost:27017/CgProductDB";

app.use(cors());

var exp = app.get('/rest/api/get', (req, res) => {
    MongoClient.connect(url, function (err, dbvar) {
        if (err) throw err;
        var coll = dbvar.db("CgProductDB");

        coll.collection("Todo").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            fs.writeFileSync('demo.json', JSON.stringify(result));
            dbvar.close();
        });
    });
});


var exp = app.put('/rest/api/update/:id/:name/:country', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var coll = db.db("CgProductDB");
        var myquery = JSON.parse('{ "_id":' + req.params.id + '}');
        var newvalues = { $set: { name: req.params.name, country: req.params.country } };
        console.log(newvalues);
        coll.collection("Todo").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });

        coll.collection("Todo").find({}).toArray(function (err, result) {
            if (err) throw err;
            fs.writeFileSync('demo.json', JSON.stringify(result));
            db.close();
        });

    });

})

app.use(bodyParser.json());
var exp = app.post('/rest/api/post', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("CgProductDB");
        var myobj = req.body;
        dbo.collection("Todo").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});

var exp = app.delete('/rest/api/delete/:id', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("CgProductDB");
        var myquery = {"_id":parseInt(req.params.id)};
        dbo.collection("Todo").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
});



exp.listen(3002, () => console.log());



