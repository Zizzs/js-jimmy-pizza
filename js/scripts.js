//Business Logic

//Pizza Object
function PizzaObject() {
    this.pizzaSize = [],
    this.toppings = [],
    this.currentId = 0
}

PizzaObject.prototype.addSize = function(size) {
    this.pizzaSize.push(size)
}

PizzaObject.prototype.addToppings = function(topping) {
    topping.id = this.assignId();
    this.toppings.push(topping);
}

PizzaObject.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
}

//Size Object

function SizeObject (size, cost) {
    this.size = size,
    this.cost = cost
}

//Toppings Object

function ToppingsObject (topping) {
    this.topping = topping;
}

//Cost Logic

//Piza Size Cost
PizzaObject.prototype.sizeCost = function() {
    if (pizzaObject.pizzaSize[0].size === "Small") {
        pizzaObject.pizzaSize[0].cost = 6.99;
    } else if (pizzaObject.pizzaSize[0].size === "Medium") {
        pizzaObject.pizzaSize[0].cost = 8.99;
    } else if (pizzaObject.pizzaSize[0].size === "Large") {
        pizzaObject.pizzaSize[0].cost = 10.99;
    } else if (pizzaObject.pizzaSize[0].size === "Extra Large") {
        pizzaObject.pizzaSize[0].cost = 13.99;
    };

}
//User Interface Logic

var pizzaObject = new PizzaObject();

$(document).ready(function(event) {
    $("#userInput").submit(function(event) {
        event.preventDefault();
        var cost;
        var pizzaSize = $("#pizzaSizeInput").val();
        var toppingInput = [];
        
        //User Input Size Selection taken and pushed into the pizzaObject.pizzaSize
        var newSize = new SizeObject(pizzaSize, cost);
        pizzaObject.addSize(newSize);


        //User Input Topping Selection taken and pushed into the pizzaObject.toppings
        $("input:checkbox[name=topping]:checked").each(function(){
            toppingInput.push($(this).val());
        });
        
        for (i=0; i < toppingInput.length; i++) {
            var tempTopping = new ToppingsObject(toppingInput[i]);
            pizzaObject.addToppings(tempTopping);
        };

        pizzaObject.sizeCost();
        console.log(pizzaObject); 

    });
});