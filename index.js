var http = require('http');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('./employee.json');
var app = express();

var exp = app.get('/rest/api/get', (req, res) => {
    console.log(data);
    res.send(data);
});

var exp = app.get('/rest/api/fetch/:stateName', (req, res) => {
    var state = req.params.stateName;
    for (var emp of data) {
        if (emp.empAddress.state == state) {
            res.write(JSON.stringify(emp));
            console.log(emp);
        }
    }
    res.end();
});

var exp = app.put('/rest/api/put/:empID/:cityName', (req, res) => {
    var id = req.params.empID;
    var city = req.params.cityName;
    for (var emp of data) {
        if (emp.empId == id) {
            emp.empAddress.city = city;
            res.send(data);
            console.log(emp);
        }
    }
});

app.use( bodyParser.json() );
var exp = app.post('/rest/api/post', (req, res) => {
    console.log(req.body);
    data.push(req.body);
    fs.writeFileSync('employee.json',JSON.stringify(data));
});

exp.listen(3002, () => console.log());



