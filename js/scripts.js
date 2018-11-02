//Business Logic

//Pizza Object
function PizzaObject() {
    this.pizzaId = 0,
    this.toppingId = 0,
    this.sauceId = 0,
    this.pizzaSauce = [],
    this.pizzaSize = [],
    this.toppings = [],
    this.totalCost = 0
}
PizzaObject.prototype.nextPizzaId = function() {
    this.pizzaId++;
}

PizzaObject.prototype.nextPizza = function() {
    if (this.toppings.length > 0) {
        this.toppings = [];
        this.toppingId = 0;
        this.pizzaSize = [];
        this.sauceId = 0;
        this.pizzaSauce = [];
        this.totalCost = 0;
    };
}
PizzaObject.prototype.addSize = function(size) {
    this.pizzaSize.push(size);
}

PizzaObject.prototype.addSauce = function(sauce) {
    sauce.id = this.assignSauceId();
    this.pizzaSauce.push(sauce);
}

PizzaObject.prototype.addToppings = function(topping) {
    topping.id = this.assignToppingId();
    this.toppings.push(topping);
}

PizzaObject.prototype.assignToppingId = function() {
    this.toppingId += 1;
    return this.toppingId;
}

PizzaObject.prototype.assignSauceId = function() {
    this.sauceId += 1;
    return this.sauceId;
}
PizzaObject.prototype.assignPizzaId = function() {
    this.pizzaId += 1;
    return this.pizzaId;
}

//Size Object

function SizeObject (size, cost) {
    this.size = size,
    this.cost = cost
}

//Sauce Object

function SauceObject (sauce, cost) {
    this.sauce = sauce,
    this.cost = cost
}

//Toppings Object

function ToppingsObject (topping, cost) {
    this.topping = topping,
    this.cost = cost
}

//Cost Logic

//Pizza Size Cost
PizzaObject.prototype.sizeCost = function() {
    if (this.pizzaSize[0].size === "Small") {
        this.pizzaSize[0].cost = 6.99;
    } else if (this.pizzaSize[0].size === "Medium") {
        this.pizzaSize[0].cost = 8.99;
    } else if (this.pizzaSize[0].size === "Large") {
        this.pizzaSize[0].cost = 10.99;
    } else if (this.pizzaSize[0].size === "Extra Large") {
        this.pizzaSize[0].cost = 13.99;
    };
}

//Sauce Cost
PizzaObject.prototype.sauceCost = function() {
    if (this.pizzaSauce[0].sauce === "Light Sauce") {
        this.pizzaSauce[0].cost = 0;
    } else if (this.pizzaSauce[0].sauce === "Regular Sauce") {
        this.pizzaSauce[0].cost = 0;
    } else if (this.pizzaSauce[0].sauce === "Extra Sauce") {
        this.pizzaSauce[0].cost = .1;
    } else if (this.pizzaSauce[0].sauce === "Spicy BBQ Sauce") {
        this.pizzaSauce[0].cost = .99;
    } else if (this.pizzaSauce[0].sauce === "Alfredo Sauce") {
        this.pizzaSauce[0].cost = .99;
    };
}
//Total Cost of Pizza

PizzaObject.prototype.totalPizzaCost = function() {
    
    this.totalCost += this.pizzaSize[0].cost;
    this.totalCost += this.pizzaSauce[0].cost;
    for (i=0; i < this.toppings.length; i++) {
        this.totalCost += this.toppings[i].cost;
    };
    percentage = (8.25 / 100) * this.totalCost;
    this.totalCost += percentage;
    this.totalCost = (Math.round(this.totalCost * 10)/10).toFixed(2);
}

//User Interface Logic
var pizzaObject = new PizzaObject();
$(document).ready(function(event) {
    $("#userInput").submit(function(event) {
        pizzaObject.nextPizza(); 
        event.preventDefault();
        var cost;
        var toppingCost;
        var sauceCost;
        var pizzaSize = $("#pizzaSizeInput").val();
        var pizzaSauce = $("#pizzaSauceInput").val();
        var toppingInput = [];
        
        //User Input Size Selection taken and pushed into the pizzaObject.pizzaSize
        var newSize = new SizeObject(pizzaSize, cost);
        pizzaObject.addSize(newSize);

        //User Input Sauce Selection taken and pushed into the pizzaObject.pizzaSauce
        var newSauce = new SauceObject(pizzaSauce, sauceCost)
        pizzaObject.addSauce(newSauce);
        //User Input Topping Selection taken and pushed into the pizzaObject.toppings
        $("input:checkbox[name=topping]:checked").each(function(){
            toppingInput.push($(this).val());
        });
        //Tried creating a function with the below if/else loop, kept getting function is not defined(Despite it being in backend logic), So I'm keeping it here.
        for (i=0; i < toppingInput.length; i++) {
            if (toppingInput[i] === "Cheese") {
                toppingCost = 0;
            } else if (toppingInput[i] === "Cheese-Extra") {
                toppingCost = .99;
            } else if (toppingInput[i] === "Pepperoni") {
                toppingCost = 1.25;
            } else if (toppingInput[i] === "Mushrooms") {
                toppingCost = .75;
            } else if (toppingInput[i] === "Onions") {
                toppingCost = .75;
            } else if (toppingInput[i] === "Sausage") {
                toppingCost = 1.25;
            } else if (toppingInput[i] === "Jalapenos") {
                toppingCost = .75;
            } else if (toppingInput[i] === "Bacon") {
                toppingCost = 1.99;
            } else if (toppingInput[i] === "Olives") {
                toppingCost = .75;
            } else if (toppingInput[i] === "Peppers") {
                toppingCost = .99;
            } else if (toppingInput[i] === "Pineapple") {
                toppingCost = 1.5;
            };
            var tempTopping = new ToppingsObject(toppingInput[i], toppingCost);
            pizzaObject.addToppings(tempTopping);
        };

        pizzaObject.sizeCost();
        pizzaObject.sauceCost();
        pizzaObject.totalPizzaCost();
        console.log(pizzaObject);
        //console.log(totalPizzaCost);
        pizzaObject.nextPizzaId();
    });
});