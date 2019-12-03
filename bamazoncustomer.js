const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var inquirer = require("inquirer");

//command line args for choosing which product to buy (by ID), and how much of that product you with to buy
var productid = process.argv[2];
var quantity = process.argv[3];

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






//allow user to select a product for purchase 
app.get('/products/:id', (res, req) => {
    mysqlconnection.query('SELECT * FROM PRODUCTS WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    })
});

function selectItem() {

    mysqlconnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "choice",
                    type: "choices",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which Item are you interested in?"
                },
                {
                    name: "Quantity",
                    type: "input",
                    message: "How many of the item would you like to buy?"
                }
            ])
            .then(function (answer) {

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }


                if (chosenItem.stock_quantity < parseInt(answer.quanity)) {

                    connection.query(
                        "UPDATE products  SET ? WHERE ?",
                        [{
                                stock_quantity: answer.quanity
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("There is not enough stock"),
                                display();
                        }
                    );
                } else {

                    console.log("Item Purchased"),
                        display();
                }
            });
    });
}


//display all products 
function display() {
    app.get('/products', (res, req) => {
        mysqlconnection.query('SELECT * FROM PRODUCTS', (err, rows, fields) => {
            if (!err)
                console.log(rows),
                selectItem();
            else
                console.log(err);
        })
    });
}

display();