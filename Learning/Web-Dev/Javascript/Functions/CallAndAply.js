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

// Call Method
book.call(euroWing, 23, 'Sarah Williams');
book.call(luftHansa, 239, 'Salar Alo');
book.call(swiss, 143, 'Hewin Alo');

// Apply Method
const flightData = [583, 'George Cooper']
book.apply(euroWing, flightData);
book.apply(luftHansa, flightData);
book.apply(swiss, flightData);