'use strict';

const flight = 'LH234';
const salar = {
  name: 'Salar Alo',
  passport: 1234567890,
}

const checkIn = function(flightNumber, passenger){
  flightNumber = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  alert((passenger.passport === 1234567890) ? 'Check in' : 'Wrong passport');
}

checkIn(flight, salar);

console.log(salar.name);
console.log(flight);

const newPassport = function(person){
  person.passport = Math.trunc (Math.random() * 100000000);
}

newPassport(salar);
checkIn(flight, salar);