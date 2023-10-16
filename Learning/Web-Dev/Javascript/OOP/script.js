'use strict';
/* 
const Person = function(firstName, birthYear){
  this.firstName = firstName;
  this.birthYear = birthYear;
};
// this keywoard is set to the object that is calling the method

//? 1. New {} is created
//? 2. function is called, this = {}
//? 3. {} linked to prototype
//? 4. function automatically returns {}

Person.prototype.calcAge = function(){
  return new Date().getFullYear() - this.birthYear;
};
// the objects inherit from prototype
const jonas = new Person('Jonas', 1991);

// extending the prototype of a builtin object is bad practice
//! 1. javascript might add the function that youve built in so it will work differently
//! 2. when you work with teams 
Array.prototype.unique = function(){
  return [...new Set(this)];
}
 */
/*
  /////////////////////////////////// 
*/


/* 
// Coding Challenge #1
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*  
//! solution
const Car = function(make, speed){
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelarate = function(){
  this.speed += 10;
  console.log(`The new speed of the ${this.make} car is equivlent to ${this.speed}kmh`);
}

Car.prototype.brake = function(){
  this.speed -= 5;
  console.log(`The new speed of the ${this.make} car is equivlent to ${this.speed}kmh`);
}

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelarate();
Mercedes.brake();

*/

//! first declare the use!
class PersonCl {
  // constructor is going to be called whenever we create a new instance of the class
  constructor(fullName, birthYear){
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // automatic prototypal inheritance (this function lies on prototype!)
  calcAge(){
    return new Date().getFullYear() - this.birthYear;
  }

  greet(){
    console.log(`hey its ${this.fullName}`);
  }

  get age(){
    return new Date().getFullYear - this.birthYear;
  }

  set fullName(name){
    if(name.includes(' '))
      this._fullName = name;
    else
      alert(`${name} is not a full name`);
  }

  get fullName(){
    return this._fullName;
  }
}

const salar = new PersonCl('Salar Alo', 2008);
const walter = new PersonCl('Wal ter', 2000);

// accesor propertys: getters and setters
// data propertys: normal propertys

const account = {
  owner: 'Salar',
  movements: [320, 100, 450, 200, 150],

  get latestMovement(){
    return this.movements.at(-1);
  },

  set latestMovement(mov){
    this.movements.push(mov);
  }
}

// We use getters as if it was a property
account.latestMovement;
//! this isnt possible becouse it is only a getter accesor property not a setter!
account.latestMovement = 10;
