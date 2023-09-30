'use strict';

const book = function(flightNumber, name){
  console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`)
  this.bookings.push({flight: `${this.iataCode}${flightNumber}`, name})
}

const luftHansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
}

const euroWing = {
  airline: 'Eurowing',
  iataCode: 'EW',
  bookings: [],
}

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
}
// Bind Methods 

const bookLX = book.bind(swiss);
const bookEW = book.bind(euroWing);
const bookLH = book.bind(luftHansa);

bookEW(23, 'Salar Alo');

// ! partial application
// definition: part of the arguments of the paramterelist are already predefined
const bookEW23 = book.bind(euroWing, 23);
bookEW23('Salar Alo');
bookEW23('Jonas Schmedttmann');

// ! with event listeners
luftHansa.planes = 300;
luftHansa.buyPlane = function()
{
  this.planes++;
  console.log(this.planes, this);
}



const buyButton = document.querySelector('.buy');
buyButton.addEventListener('click', luftHansa.buyPlane.bind(luftHansa));

// ! Partical application real world example!
const addTax = (taxRate, value) => value + value * taxRate;
const addVAT = addTax.bind(null, 0.23);

const createTaxFunction = function(taxRate, value){
  return () => value + value * taxRate; 
};