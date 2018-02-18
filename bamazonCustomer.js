var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require('chalk');
// const log = console.log;

var connection = mysql.createConnection({

    host: "localhost",
    port: 3308,

    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    // 
    
    queryAllProducts();
    buyProduct();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
};
function buyProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "userPick",
                message: "What item number would you like to buy?",
            },
            {
                type: "input",
                name: "userQuantity",
                message: "How many would you like?"
            }
        ]).then(function (answer) {
            console.log(answer);
            connection.query(
                "SELECT * FROM products WHERE ?",
                {
                    item_id: answer.userPick
                },
                function (err, res) {
                    console.log(chalk.yellow("this is the stock quantity " + res[0].stock_quantity))
                    console.log(chalk.yellow("this is the price " + res[0].price))
                    console.log(chalk.yellow("this is the item name " + res[0].product_name))
                    
                    if (res[0].stock_quantity >= answer.userQuantity) {
                        var totalCost = res[0].price * answer.userQuantity
                        var newQuantity = res[0].stock_quantity - answer.userQuantity
                        var productName = res[0].product_name
                        console.log(chalk.yellow("new quantity " + newQuantity));
                        console.log(chalk.green("cost " + totalCost));
                        
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: answer.userPick
                                }
                            ],
                            function (err, res) {
                                console.log(chalk.blue("That will be $" + totalCost + "."));
                                console.log(chalk.blue("You now have: " + answer.userQuantity + " " + productName));
                                connection.end();
                            });
                    }
                    else {
                        console.log(chalk.red("I'm sorry we do not have that many in stock!"));
                        connection.end();
                    }
                });
        });
    });
};




