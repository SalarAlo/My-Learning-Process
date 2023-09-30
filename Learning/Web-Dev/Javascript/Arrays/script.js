'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ! LECTURES

/* 
let arr = [...'abcde']; 
// ! slice
// this works the exact same as the slice Method with the strings 
// so all of the rules that we applied to the string slice Method also applies to this one!
// the slice method returns an array

// the way this works is that you get each and every element starting from index 2 if you only pass in 1 parameter
const newArr = arr.slice(2);

// the way this workd is that you can also specify an end parameter but its exclusive
const newArr2 = arr.slice(2, 4);


// we can also specify a negative parameter and this works the exact same with the string.slice method
const newArr3 = arr.slice(-3);

// ! splice
// works in almost the same way as in slice but the fundamental difference is that it also mutates the original array
// that you called that function on so for example if you call the splice method on a new array like this
// the splice method will return the new array the exact same as the slice Method but it will also 
// remove the values from that original array that we called the method on

const arr2 = [...'abcde'];

arr2.splice(-3);
console.log(arr2);
arr2.slice(0, 1);

// ! Reverse
// THIS METHOD DOES MUTATE THE ORIGINAL ARRAY!
const arr3 = [...'abcde'];
console.log(arr3.reverse());
console.log(arr3.reverse());

// ! Concat
// combine arrays
const letters = arr.concat(['f, g, h, i, j']);
 */
/////////////////////////////////////////////////

/* 
const arr = [23, 11, 64]

console.log(arr[0]);
console.lof(arr.at(0))

const arrLastElementad = arr[arr.length - 1];
const lastElementOkay = arr.slice(-1)[0];
const lastElementGood = arr.at(-1);

// also works on strings!
const lastChar = 'Salar'.at(-1); 
*/

//! forEach(...);
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of
for(const [i, move] of movements.entries())
  console.log((move < 0) ? 'You withdrew ' + move : 'You deposited ' + move);

console.log('________________________________________________')

// foreach
// ! continue and break doesnt work in forEach!

movements.forEach(function(currElement, i, arr)
{
  console.log((currElement < 0) ? 'You withdrew ' + Math.abs(currElement) : 'You deposited ' + currElement);
});
 */
