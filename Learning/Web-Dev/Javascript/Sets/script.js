'use strict';

// Destructering

const restaurant = {
  restaurantName: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],



  // ES6 enhanced object literals!
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },

    fri: {
      open: 11,
      close: 23,
    },

    sat: {
      open: 0,
      close: 24,
    },
  },


  // ES6 enhanced object literals
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.categories[mainIndex]];
  },

  orderDelivery({ time: deliveryTime = "0:00", addres = "no adress", mainIndex = 1, startIndex: starterIndex = 1 }) {
    console.log(`Delivering to ${addres} at ${deliveryTime}. The food he ordered was ${this.mainMenu[mainIndex]} and ${this.starterMenu[starterIndex]}`);
  },

  orderPasta: (ing1, ing2, ing3) => `Here is pasta with ${ing1}, ${ing2} and ${ing3}`,

  addBills: (...bills) => {
    let sum = 0;

    for (let i = 0; i < bills.length; i++)
      sum += bills[i];

    return sum;
  }
};

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


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    draw: 3.25,
    team2: 6.5,
  },

  printGoals: function (...playersScored) {
    for (let i = 0; i < playersScored.length; i++)
      console.log(playersScored[i] + " HAS SCORED A GOAL!!!");

    console.log(playersScored.length + " Goals have been scored in total!");
  }
};

/* 
const [players1, players2] = [...game.players];

const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, "Thiago", "Coutinho", 'Perisic'];
const { odds: { team1, x: draw, team2 } } = game;

(game.odds.team1 < game.odds.team2) && console.log("team1 is more likely to win!"); 
*/


// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/* 
// 1
for(const [goalNumber, scorer] of game.scored.entries()){
  console.log(`Goal ${goalNumber + 1}: ${scorer}`);
}

// 2
let averageOdd = 0;
for(const odd of Object.values(game.odds)){
  averageOdd += odd;
}
console.log("The average odd is: " + averageOdd / Object.values(game.odds).length)

// 3
for(const [key, value] of Object.entries(game.odds))
{
  console.log(`Odds of ${game[key] ?? "draw"}: ${value}`)
}

// 4 (Bonus)
const scorers = {

};
for(const scorer of Object.values(game.scored))
{
  (scorers[scorer] === undefined) ? scorers[scorer] = 1 : scorers[scorer]++;
}

console.log(scorers);
*/