//Business Logic
var tempCost;
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
//Topping Cost
function calculateToppingCost(currentTopping) {
    if (currentTopping === "Cheese") {
        tempCost = 0;
        return tempCost;
    } else if (currentTopping === "Cheese-Extra") {
        tempCost = .99;
        return tempCost;
    } else if (currentTopping === "Pepperoni") {
        tempCost = 1.25;
        return tempCost;
    } else if (currentTopping === "Mushrooms") {
        tempCost = .75;
        return tempCost;
    } else if (currentTopping === "Onions") {
        tempCost = .75;
        return tempCost;
    } else if (currentTopping === "Sausage") {
        tempCost = 1.25;
        return tempCost;
    } else if (currentTopping === "Jalapenos") {
        tempCost = .75;
        return tempCost;
    } else if (currentTopping === "Bacon") {
        tempCost = 1.99;
        return tempCost;
    } else if (currentTopping === "Olives") {
        tempCost = .75;
        return tempCost;
    } else if (currentTopping === "Peppers") {
        tempCost = .99;
        return tempCost;
    } else if (currentTopping === "Pineapple") {
        tempCost = 1.5;
        return tempCost;
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

        //All Cost Related Functions are ran below
        for (i=0; i < toppingInput.length; i++) {
            calculateToppingCost(toppingInput[i]);
            var tempTopping = new ToppingsObject(toppingInput[i], tempCost);
            pizzaObject.addToppings(tempTopping);
        };

        pizzaObject.sizeCost();
        pizzaObject.sauceCost();
        pizzaObject.totalPizzaCost();
        console.log(pizzaObject);
        pizzaSizeString = pizzaObject.pizzaSize[0].size.toString();
        pizzaSauceString = pizzaObject.pizzaSauce[0].sauce.toString();
        $("#pizzaOutput").append("<p class='clickable' id='"+pizzaObject.pizzaId+"'>"+pizzaObject.pizzaSize[0].size+" pizza ($"+pizzaObject.totalCost+")</p>");
        $("#pizzaInfoOutput").append('<div class="info" id=info'+pizzaObject.pizzaId+'><p>Size: '+ pizzaSizeString+'</p><p>Sauce: '+ pizzaObject.pizzaSauce[0].sauce+'</p></div>');
        //$("#pizzaInfoOutput").append('<div class="info" id=info'+pizzaObject.pizzaId+'>Size: '+ pizzaObject.pizzaSauce[0].sauce+'</div>');
        $(".clickable").click(function(event) {
            var id = $(this).attr('id');
            var idName = "#info" + id;
            console.log(idName);
            $(idName).show();
        });
        pizzaObject.nextPizzaId();

    });
});