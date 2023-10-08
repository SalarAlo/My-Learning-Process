'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25_000, -642.21, -133.9, 79.97, 1_300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z', 
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5_000, 3_400, -150, -790, -3_210, -1_000, 8_500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
'use strict';

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
const btnAccount = document.querySelector('.createAccount__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentlyLoggedIn = null;
let sorted = false;
const logoutTime = 300;
let currentTimer = undefined;

const daysPassedSince = (date) => Math.round(Math.abs((new Date() - date) / (1000 * 60 * 60 * 24)));

// returns the current date
const currDate = () => new Date();

// get the balance of the account we've passed in
const getBalance = acc => acc.movements.reduce((acc, mov) => acc + mov);

// get a string or some value and turn it into a date
const turnToDate = str => new Date(str);

// add a zero before a number which is below 10 so for example 9 = 09
const addZero = num => ((num < 10) ?  ('0' + (num)) : (num))

// format a date value into a human readable string
const formatToReadableDate = function(date){
  const daysPassed = daysPassedSince(date);
  if(daysPassed === 0){
    return 'today';
  }
  else if(daysPassed === 1){
    return 'yesterday';
  }
  else if(daysPassed <= 7){
    return daysPassed + ' days ago';
  }

  return addZero(date.getDate()) + '.' + addZero(date.getMonth() + 1) + '.' + date.getFullYear()
};

// get the current date formatted to human readable 
const getCurrentDateFormated = () => formatToReadableDate(currDate()) + ', ' + addZero(currDate().getHours()) + ':' + addZero(currDate().getMinutes());

// each of the accounts names get shortened up to the 2 initals so jonas schmeddtman turns into = js for example
const createUserNames = function(){
  accounts.forEach(function(acc) {
    acc.username = acc.owner.
    toLowerCase().
    split(' ').
    map((name) => name[0]).
    join('');
  });
}


// setUp the date stuff that is necessary for our codebase
const setUpDate = function(){
  accounts.forEach(function(acc){
    acc.movementsDates.forEach(function(_, i){
      acc.movementsDates[i] = turnToDate(acc.movementsDates[i]);
    });
  });

  labelDate.textContent =  getCurrentDateFormated();
}

// call the 2 functions
setUpDate();
createUserNames();

// show the whole balance on the label 
const showBalance = function(movements){
  const balance = movements.reduce((accumalator, mov) => accumalator + mov, 0);
  labelBalance.textContent = balance + '€';
}

// show the summary of the user thats currently logged in
const showSummary = function(movements){
  const noWithdrews = !movements.some((elem) => elem < 0);
  const noDeposits = !movements.some((elem) => elem > 0);

  const depositsSum = noDeposits ? 0 : movements
    .filter(mov => mov > 0)
    .reduce((accu, mov) => accu + mov).toFixed(2);
  
  

  const withdrewsSum = noWithdrews ? 0 : movements
    .filter(mov => mov < 0)
    .reduce((accu, mov) => accu + mov).toFixed(2);

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2 / 100)
    .filter(interest => interest >= 1)
    .reduce((accu, interest) => accu + interest).toFixed(2);

  labelSumIn.textContent = depositsSum + '€';
  labelSumOut.textContent = Math.abs(withdrewsSum) + '€';
  labelSumInterest.textContent = interest + '€';
}

// show the movements of the user thats currently logged in
const showMovements = function(movements, dates){
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i)
  {
    const type = (mov > 0) ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${formatToReadableDate(dates[i])}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
}

// login the user that weve passed in
const login = function(acc){
  sorted = false;
  const movs = acc.movements;

  showMovements(movs, acc.movementsDates);
  showSummary(movs);
  showBalance(movs);

  containerApp.style.opacity = 1;
  labelWelcome.textContent = 'Welcome back, ' + acc.owner.split(' ')[0];

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  clearInterval(currentTimer);
  labelTimer.textContent = '05:00';
  currentTimer = setTimer();
}

const setTimer = function(){
  let seconds = logoutTime;

  const timer = setInterval(()=> {
    seconds--; 

    let minutes = Math.floor(seconds / 60);
    let displaySeconds = seconds % 60;
    const finalTime = addZero(minutes) + ':' + addZero(displaySeconds);
    labelTimer.textContent = finalTime;

    if(seconds === 0){
      logout(timer);
    }
  }, 1000)

  return timer;
}

// logout a user
const logout = function(timer){
  currentlyLoggedIn = null;

  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';

  inputCloseUsername.value = '';
  inputClosePin.value = '';

  clearInterval(currentTimer);
}

// check if the user's login input is valid and then log him in
const checkForUser = function(){
  const reset = function(){
    inputLoginPin.value = ''; 
    inputLoginUsername.value = '';
  }

  const usernameInp = inputLoginUsername.value;
  const passwordInp = inputLoginPin.value;

  const loginUser = accounts.find(acc => acc.username === usernameInp);

  reset();

  if(loginUser?.username ===  usernameInp && loginUser?.pin === Number(passwordInp)){
    login(loginUser);
    currentlyLoggedIn = loginUser;
  }
}

// tranfer money to another user 
const transfer = function(){
  const amount = Number(inputTransferAmount.value);
  const userTargetUsername = inputTransferTo.value;

  const transferTarget = accounts.find(acc => acc.username == userTargetUsername);

  if(!transferTarget || transferTarget === currentlyLoggedIn)
    return;

  if(getBalance(currentlyLoggedIn) < amount || amount <= 0)
    return;

  transferTarget.movements.push(amount);
  transferTarget.movementsDates.push(new Date());

  currentlyLoggedIn.movements.push(-amount);
  currentlyLoggedIn.movementsDates.push(new Date());
  login(currentlyLoggedIn);
};

// delete accounts
const closeAccount = function(){
  const usernameConf = inputCloseUsername.value;
  const pinConf = inputClosePin.value;

  console.log(currentlyLoggedIn);

  if(currentlyLoggedIn.username == usernameConf && currentlyLoggedIn.pin == pinConf){
    const accIndex = accounts.findIndex((acc) => acc === currentlyLoggedIn);
    accounts.splice(accIndex, 1);

    currentlyLoggedIn = null;
    logout();
  }
} 

// to request loans of money (rule: loan must be smaller then biggestdeposit * 10)
const requestLoan = function(){
  const loan = Number(inputLoanAmount.value);

  const getLoan = setTimeout(function(){
    currentlyLoggedIn.movements.push(loan);
    currentlyLoggedIn.movementsDates.push(currDate());

    inputLoanAmount.value = '';

    login(currentlyLoggedIn);
  }, 1000)

  const invalidLoan = !(currentlyLoggedIn.movements.filter(elem => elem > 0)).some(dep => dep >= loan * 0.1) || loan === NaN || loan <= 0

  if(invalidLoan)
    clearTimeout(getLoan);
}

// sort the movements from deposits to withdrews
const sortedMovementsWithDates = function() {
  const passSorted = (unsorted, isSorted) => (sorted ? isSorted : unsorted);

  const map = new Map();
  currentlyLoggedIn.movements.forEach((mov, i) => map.set(mov, currentlyLoggedIn.movementsDates[i]));
  const mapSorted = [...map.entries()].sort((arr1, arr2) => arr1[0] - arr2[0]);

  const sortedMovements = mapSorted.map(arr => arr[0]);
  const sortedDates = mapSorted.map(arr => arr[1]);

  showMovements(passSorted(sortedMovements, currentlyLoggedIn.movements), passSorted(sortedDates, currentlyLoggedIn.movementsDates));
  sorted = !sorted;
};

// add the functions to the event listeners

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  checkForUser();
});


btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  transfer();
});

btnClose.addEventListener('click', function(e){
  e.preventDefault();

  closeAccount();
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  requestLoan();
});

btnSort.addEventListener('click', function(e){
  e.preventDefault();
 
  sortedMovementsWithDates();
});

// Lectures 
// string need to start with a number
/* 
console.log(Number.parseInt('30px', 10));
console.log(Number.parseFloat('2.5rem'));

console.log(Number.isNaN('sadas'));

console.log(isFinite(23))

console.log(Number.isInteger(213.213));
 */
/* 
Math.sqrt(25);

console.log(Math.max(...[123,4234,4 ,532234, 123]));
console.log(Math.min(...[123,4234,4 ,532234, 123]));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min)) + min;

Math.round();
Math.floor();
Math.ceil();

console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));

*/

/* 
const diameter = 287_460_000_000;
const price = 1499_99;

console.log(Number('102_12'));
console.log(typeof(NaN));

*/
/* 
// max safe value 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);

console.log(12612871238612387123681327612386328623181236787216n);
console.log(BigInt(12612871238612387123681327612386328623181236787216));

// Operations with big int numbers
console.log(10_000n + 10_000n); // => 20_000n
console.log(321231231132132n * 10n); // => huge number

const normalNumber = 12;
const bigIntNumber = 32n;

console.log(BigInt(normalNumber) * bigIntNumber);

console.log(20n == 20); //! => true
console.log(20n === 20); //! => false

// Division
console.log(-12n / 3n);
 */

// Create a date (4 ways)
/* 
//* current Date
const now = new Date();
console.log(now);

//* parsing string
const someDate = new Date('Sep 02 2023 19:12:21');
const someDate2 = new Date('December 25, 2015');

const dateMovements = new Date(account1.movementsDates[0]);
console.log(dateMovements);

//* numbers
const date = new Date(2049, 11, 7, 13, 23, 5);
const date2 = new Date(2049, 11, 7, 13, 23, 5);
console.log(date);

//* some Shit
console.log(new Date(0));

//! working with dates
const future = new Date(2023, 9, 8, 0, 28);
future.getFullYear();

// 9 = October
future.getMonth();

// day in month
future.getDate();

// day in week
future.getDay();

future.getHours();

future.getMinutes();
future
future.getSeconds();

// miliseconds that have passed since january first 1970
future.getTime();

// miliseconds that have passed since january first 1970
console.log(Date.now());

future.setFullYear(2040);
// also exists: setMonth, setDate, setHours and so on 
*/
/* 
console.log('Hallo');
setTimeout(()=>console.log('Here is your pizza :adult:'), 3000);
console.log('Hallo');


setTimeout((ing1, ing2)=>console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, 'spinach', 'olives');

const ingredients = ['spinach', 'olives']

const pizzaDelivery = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000, 
  ...ingredients
)

if(ingredients.includes('spinach'))
  clearTimeout(pizzaDelivery);
*/
