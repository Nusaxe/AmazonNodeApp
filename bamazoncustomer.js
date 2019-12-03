const mysql = require('mysql');

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

app.listen(3306,()=>console.log('express server is running at port 3306'));

