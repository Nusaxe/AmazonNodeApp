const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Satch8826',
    database: 'bamazon'
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log('DB Connection Good to go');
    else
        console.log('DB Connection in pain, please fix \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3300, () => console.log('express server is running at port 3300'));

app.get('/products', (res, req) => {
    mysqlconnection.query('SELECT * FROM PRODUCTS', (err, rows, fields) => {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    })
});