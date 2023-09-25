'use strict';

// a set is a container where no element is equal to another
// sets can hold different datatypes

// this set function takes in an iterable and removes all of the duplicates within that iterable!
const ordersSet = new Set([0, 1, 1, 2, 0, 1]);
const myName = new Set("Salar");

// all of the duplicates will be gone!
console.log(ordersSet);
console.log(myName);

// How to get the length of a set?
ordersSet.size;

// How to chekc if an element is within a set
ordersSet.has(0);

// How to add new elements to a set
// if we add a element which already is within the set the set simply wont add that value
ordersSet.add(3);

// How to delete elements from a set
ordersSet.delete(1);


// How to retrieve values from a set?
//! You cant

// iterate over sets:
for(const element of ordersSet)
  console.log(element);

//! REAL WORLD EXAMPLE
const staff = ['Waiter', 'Waiter', 'Chef', 'Manager', 'Chef', 'Waiter']
const rolesArray = [...new Set(staff)];
const rolesSize = new Set(staff).size;

// How to clear a set
ordersSet.clear();
