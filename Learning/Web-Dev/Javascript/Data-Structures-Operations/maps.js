'use strict';

// to create an instance of a map call the constructor of the Map class
// * its easiest to declare an empty map
// a map is a way to give each element a key value of any datatype! 
const restaurantMap = new Map();


// to add a key with a corrosponding value you need to use the set function!
// the first argument will be the key the second will be the value for that key
// and remember you can use any datatype for the key you want (Number, String, Object, ...)
restaurantMap.set("Owner", "Salar");
restaurantMap.set("Menu", ["Pizza", "Burger", "Fries"]);
restaurantMap.set(1, "Germany")
restaurantMap.set("Categories", ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']);

// The set currently looks like this: {"Owner" => "Salar", "Menu" => ["Pizza", "Burger", "Fries"], 1 => "Germany", "Categories" => ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']};
// youre also able to "chain" multiple set functions pretty easily the way you do it is by just adding another '.' and calling the function again after the last set method
// closes parenthesis

restaurantMap
.set("close", 23)
.set("open", 11)
.set("break", 16)
.set(true, "We are open")
.set(false, "We are closed");

// in order to retrieve a value you use the get method!
console.log(restaurantMap.get('open'));
console.log(restaurantMap.get('close'));

// simple example
const time = 23.01;
const openingTime = restaurantMap.get("open");
const closingTime = restaurantMap.get("close");
console.log(restaurantMap.get(time >= openingTime && time <= closingTime));


// has to check if a key is within the map
console.log(restaurantMap.has(true));


// how to delete a key with the delete()
restaurantMap.delete(true);

// how to get the size of a map?
restaurantMap.size;

// how to clear the map?
restaurantMap.clear();

// if you use objects as keys you need to pass in the key as REFERENCE not by value!
const arr = [1, 2];
restaurantMap.set(arr, "test")

restaurantMap.delete(true);

// ! This wont work becouse thats only by value but we need the exact same 
// ! variable that points to the same memory adress on the heap!
restaurantMap.get([1, 2]); 

// * this will work!
console.log(restaurantMap.get(arr));