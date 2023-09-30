const secureBooking = function(){
  let passengerCount = 0;

  return function() {
    passengerCount++;

    console.log('passengers: ' + passengerCount);
  }
}

const booker = secureBooking();


booker();
booker();
booker();

console.dir(booker);