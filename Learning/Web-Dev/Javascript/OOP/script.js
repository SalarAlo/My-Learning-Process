'use strict';

class PersonCl {
  constructor(fullName, birthYear){
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge(){
    return new Date().getFullYear() - this.birthYear;
  }

  greet(){
    console.log(`hey its ${this.fullName}`);
  }

  get age(){
    return new Date().getFullYear - this.birthYear;
  }

  set fullName(fullNameParameter){
    if(fullNameParameter.includes(' '))
      this._fullName = fullNameParameter;
    else
      alert(`${fullNameParameter} is not a full name`);
  }

  get fullName(){ 
    return this._fullName;
  }

  static hey(){
    console.log('hey');
  }
}

const salar = new PersonCl('Salar Alo', 2008);
const walter = new PersonCl('Wal ter', 2000);

//!

const personProto = {
  calcAge(){
    return new Date().getFullYear() - this.birthYear;
  },
  
  greet(){
    console.log(`hey its ${this.fullName}`);
  },

  init(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

const steven = Object.create(personProto);

steven.firstName = 'Steven';
steven.birthYear = 2008;

const sarah = Object.create(personProto);
sarah.init('Sarah', 2007);

//!
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/* 
class Car {
  constructor(make, speed){
    this.make = make;
    this.speed = speed;
  }

  accelarate(){
    this.speed += 10;
  }

  brake(){
    this.speed -= 5;
  }

  get speedUS(){
    return this.speed / 1.6;
  }

  set speedUS(milesPH){
    this.speed = milesPH * 1.6;
  }
} 
*/

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


///////////////////////////////////////////

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function(){
  return 2023 - this.birthYear;
}


const Student = function(firstName, birthYear, course){
  Person.call(this, firstName, birthYear);
  this.course = course;
}

// the Student.prototype inherits from Person.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function(){
  return`My name is ${this.firstName} and I study ${this.course}`;
}

const mike = new Student('Mike', 2008, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__.__proto__ === Person.prototype);
