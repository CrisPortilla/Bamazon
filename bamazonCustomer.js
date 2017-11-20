var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",

    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadID);
    displayProducts();
    //var query = connection.query('SELECT * FROM products', queryResults);
});

function displayProducts(err, res) {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err;
        };
        console.log("All A Developer Needs! Products:");
        console.log("ID" + " | " + "  Product" + "             | " + "Department" + "|" + "Price" + " | " + "Stock");
        //var query = connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id  + "  | " + res[i].product_name + "    | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            console.log("------------------------------------------------------");
        };

        startShopping(res);
    });
};

function startShopping(res) {
    inquirer.prompt([{
            type: "input",
            message: "What would you like? Please insert ID.",
            name: "id",
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "How many do you want?",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function (response) {
        var id = parseInt(response.id) - 1;
        var userWants = parseInt(response.quantity);
        cartBreakdown(id, userWants, res);
    });
};

function cartBreakdown(id, userWants, res) {
    var query = connection.query("SELECT * FROM products WHERE item_id", function (err, res) {
        if (err) {
            throw err
        };
        if (userWants > res[0].stock_quantity) {
            console.log("Unfortunatley we dont have enough to complete your order");
            connection.end();
        } else {
            var totalCost = parseFloat((res[id].price) * userWants);
            var quantity = res[0].stock_quantity - userWants;

            checkout(id, quantity, totalCost);
        }
    });
}

function checkout(id, quantity, totalCost) {
    var query = connection.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            console.log("Your order has processed, expect a drone to deliver it within 5 hours!");
            console.log("You have been charged: $", totalCost);
           console.log(res.affectedRows + " products updated!\n");
            //displayProducts();
            
        }
    );

    console.log(query.sql)
}

//connection.end();