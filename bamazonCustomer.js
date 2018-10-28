var mysql = require("mysql");
var inquirer = require("inquirer");


// MYSQL connection setup
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// Starting MYSQL connections that calls start() function
connection.connect(function (err) {
    if (err) throw err;

    console.log("Welcome to Bamazon");
    start();  
});
var inventoryArray = [];


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
           printInventory(inventoryArray);
           productSelection();
        };
        return makeArray();  
    });
}; 

//Function to print inventory to screen
    var printInventory = function (array) {
        for (var i = 0; i < array.length; i++) {
            var display = [
                    "------------------------------------------------------------",
                    "Product ID: " + array[i].id,
                    "Product Name: " + array[i].name,
                    "Price: " + array[i].price,
                    "------------------------------------------------------------"
                ].join("\n");
                console.log(display);
        }
    };

 //Inquiry to prompt user to select a product for sale   
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
                   var getSql = function(answer, results){ 
                    fullfillOrder(answer, results);
                };
                return getSql(answer, results);

                });
       
        //Function to update inventory on MYSQL    
        var updateInventory = function(answers,results) {  
            var newQuantity = parseInt(results[answer.purchaseId - 1].stock_quantity - answer.quantity);
            var idToFind = parseInt(answer.purchaseId);
            console.log("New Stock Quantity: " + newQuantity);
           
            connection.query("UPDATE products SET ? WHERE ?",
                [{
                     stock_quantity: newQuantity
                },
                {
                    id: idToFind
                }
                  ],
                  function(error, res) {
                    if (error) {throw err;}
                    console.log(res.affectedRows)
                    console.log("Stock reduced!");
                    connection.end();
               

            });
        };
        // Function to fullfill order by checking quanitity to make sure the sale can go through.      
        var fullfillOrder = function(answer,results){
            if(answer.quantity < results[answer.purchaseId - 1].stock_quantity){
                console.log("\nThank you for purchasing " + answer.quantity + " of the " + results[answer.purchaseId - 1].product_name + "! Your total is: " + answer.quantity * results[answer.purchaseId - 1].price);
                updateInventory(answer,results);
             }
            else{
                 console.log( "Insufficient quantity!"); 
                 connection.end();
               
            }
            };       
        });
    }   

        

   
  
