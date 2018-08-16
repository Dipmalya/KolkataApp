var names = require('./prob1');

var name1 = "Aditya Gupta";;

names.employeeNames.push(name1);

for(var emp of names.employeeNames){
    console.log(emp);
}