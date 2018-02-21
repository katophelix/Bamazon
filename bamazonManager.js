// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

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
    managerMenu();

});


function managerMenu() {

    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "Please choose from the menu?",
                choices: ["List all products for sale", "View low inventory", "Add to quantity of a product's Inventory", "Add a new product", "Exit Program"]
            },

        ]).then(function (inquirerResponse) {
            console.log("\nUser wants to " + inquirerResponse.choices + "\n")

            if (inquirerResponse.choices === "List all products for sale") {
                listAllProducts();
            }
            else if (inquirerResponse.choices === "Add a new product") {
                addProduct();
            }
            else if (inquirerResponse.choices === "View low inventory") {
                lowInventory();
            }
            else if (inquirerResponse.choices === "Add to quantity of a product's Inventory") {
                addQuantity();
            }
            else if (inquirerResponse.choices === "Exit Program") {
                connection.end();
            };
        });


    function listAllProducts() {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("-----------------------------------");
            managerMenu();


        });
    };


    function addProduct() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the product name of the item would you like to add?\n",
                    name: "name",
                },
                {
                    type: "input",
                    message: "What department is it in?\n",
                    name: "department",
                },
                {
                    type: "input",
                    message: "What is the price?\n",
                    name: "price",
                },
                {
                    type: "input",
                    message: "What is the quantity of the new product?\n",
                    name: "quantity",
                }
            ])
            .then(function (answer) {

                console.log("Inserting a new product...\n");
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: answer.name,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.quantity,

                    },
                    function (err, response) {
                        console.log(response.affectedRows + " item added!\n");

                        managerMenu();

                    });
            });
    };

    function lowInventory() {
        var query = "SELECT stock_quantity, product_name FROM products WHERE stock_quantity < 5";
        connection.query(query, function (err, response) {
            if (err) throw err;
            for (var i = 0; i < response.length; i++) {
                console.log(response[i].product_name, response[i].stock_quantity);
            }
            if (response.length === 0) {
                console.log("No low inventory.");
            }

            managerMenu();

        });
    };
    function addQuantity() {

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the item ID that you want to increase?\n",
                    name: "itemID",
                },
                {
                    type: "input",
                    message: "What do you want to increase the quantity to?\n",
                    name: "quantity"
                }
            ])
            .then(function (answer) {

                console.log("Adding quantity a new product...\n");
                connection.query(
                    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [answer.quantity, answer.itemID],

                    function (err, response) {
                        console.log(response.affectedRows + " item updated!\n");

                        managerMenu();

                    });
            });

    }
};







