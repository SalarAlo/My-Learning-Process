'use strict';

const bookingArray = [];

// * How to set default parameters
// youre also able to use the parameters to compute the base value of the other parameters

// ! but its important that the parameter you want to use for you calculation comes before the parameter
// ! that you want to compute!
const createBooking = function(flightNumber = 'LH123', numPassengers = 1, price = 199 * numPassengers)
{
  const booking = {
    flightNumber,
    numPassengers,
    price
  }
  bookingArray.push(booking);
}

createBooking('LH123');

// ! How to skip values?
createBooking('LH123', undefined, 1000);