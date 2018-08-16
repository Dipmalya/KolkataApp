var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var url = "mongodb://localhost:27017/productDB";

var getData = function(){
    MongoClient.connect(url, function (err, dbvar) {
        if (err) throw err;
        var coll = dbvar.db("productDB");

        coll.collection("Product").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            dbvar.close();
        });
    });
}();

var getDataById = function(id){
    MongoClient.connect(url, function (err, dbvar) {
        if (err) throw err;
        var coll = dbvar.db("productDB");

        coll.collection("Product").find({"productID":parseInt(id)}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            dbvar.close();
        });
    });
};


var deleteById = function(id){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("productDB");
        var myquery = {"productID":parseInt(id)};
        dbo.collection("Product").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};

var updateById = function(id){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var coll = db.db("productDB");
        var myquery = JSON.parse('{ "productID":' + id + '}');
        var newvalues = { $set: { productName: "Capgemini", productDesc: "Good Company", productCost: "NA" } };
        coll.collection("Product").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
};




