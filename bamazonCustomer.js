var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;

    console.log("Welcome to Bamazon");
    start();
    
});
var inventoryArray = [];
var stockQuanity = "";
var total = 0;
var productName = "";
//Function for creating product array and printing to console.
function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        var makeArray = function () {
            for (var i = 0; i < results.length; i++) {
                var listItem = {
                    id: results[i].id,
                    name: results[i].product_name,
                    price: "$" + results[i].price
                };
                inventoryArray.push(listItem);  
            }
           printInventory();
           productSelection();
        };
        return makeArray();  
    });
};  
    var printInventory = function () {
        for (var i = 0; i < inventoryArray.length; i++) {
            var display = [
                    "------------------------------------------------------------",
                    "Product ID: " + inventoryArray[i].id,
                    "Product Name: " + inventoryArray[i].name,
                    "Price: " + inventoryArray[i].price,
                    "------------------------------------------------------------"
                ].join("\n");
                console.log(display);
        }
    };
   
          
    var productSelection = function() {
        inquirer
            .prompt([

                {
                    name: "purchaseId",
                    type: "input",
                    message: "Enter the Product ID of the item for purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                connection.query("SELECT * FROM products", function (err, results) {
                   var getSql = function(){ 
                    stockQuanity = results[answer.purchaseId - 1].stock_quantity;
                    total = answer.quantity * results[answer.purchaseId + 1].price;
                    productName = results[answer.purchaseId - 1].product_name
                    fullfillOrder();
                };
                return getSql();

                });
       
            
        var updateInventory = function() {  
            console.log("Updating") 
            var newQuantity = stockQuanity - answer.quantity;
            var idToFind = answer.purchaseId + 1
            console.log("Stock: " + newQuantity);
            console.log("ID: " + idToFind);
            connection.query("UPDATE auctions SET ? WHERE ?", function (err, results) {
                [
                    {
                        stock_quantity: stockQuanity
                    },
                    {
                        id: idToFind
                    }
                  ],
                  function(error) {
                    if (error) throw err;
                    console.log("Stock reduced!");
                  };
            });
        };
            
        var fullfillOrder = function(){
            console.log(stockQuanity);
            if(answer.quantity < stockQuanity){
                console.log("\nThank you for purchasing " + answer.quantity + " of the " + productName + "! Your total is: " + total);
                updateInventory();
            
             }
            else{
                 console.log( "Insufficient quantity!"); 
            }
            };
                  
        });
    }   

        

   
  
