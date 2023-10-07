'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
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

const getBalance = acc => acc.movements.reduce((acc, mov) => acc + mov);

const createUserNames = function()
{
  accounts.forEach(function(acc) {
    acc.username = acc.owner.
    toLowerCase().
    split(' ').
    map((name) => name[0]).
    join('');
  });
}
createUserNames();

const showBalance = function(movements)
{
  const balance = movements.reduce((accumalator, mov) => accumalator + mov, 0);
  labelBalance.textContent = balance + '€';
}

const showSummary = function(movements)
{
  const noWithdrews = !movements.some((elem) => elem < 0);
  const noDeposits = !movements.some((elem) => elem > 0);

  console.log(noWithdrews, noDeposits);

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

const showMovements = function(movements)
{
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i)
  {
    const type = (mov > 0) ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
}

const login = function(acc)
{
  sorted = false;
  const movs = acc.movements;

  showMovements(movs);
  showSummary(movs);
  showBalance(movs);

  containerApp.style.opacity = 1;
  labelWelcome.textContent = 'Welcome back, ' + acc.owner.split(' ')[0];

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
}

const logout = function(){
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';

  inputCloseUsername.value = '';
  inputClosePin.value = '';
}

const checkForUser = function()
{
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


const transfer = function()
{
  const amount = Number(inputTransferAmount.value);
  const userTargetUsername = inputTransferTo.value;

  const transferTarget = accounts.find(acc => acc.username == userTargetUsername);

  if(!transferTarget || transferTarget === currentlyLoggedIn)
    return;

  if(getBalance(currentlyLoggedIn) < amount || amount <= 0)
    return;

  transferTarget.movements.push(amount);

  currentlyLoggedIn.movements.push(-amount);
  login(currentlyLoggedIn);
};

const closeAccount = function(){
  const usernameConf = inputCloseUsername.value;
  const pinConf = inputClosePin.value;

  console.log(currentlyLoggedIn);
  console.log('pinConf = ' + pinConf, 'usernameConf = ' + usernameConf);

  if(currentlyLoggedIn.username == usernameConf && currentlyLoggedIn.pin == pinConf){
    const accIndex = accounts.findIndex((acc) => acc === currentlyLoggedIn);
    accounts.splice(accIndex, 1);

    currentlyLoggedIn = null;
    logout();
  }
} 

const requestLoan = function(){

  const loan = Number(inputLoanAmount.value);

  if(loan === NaN || loan <= 0)
    return;

  const deposits = currentlyLoggedIn.movements.filter(elem => elem > 0);
  const rule10Percent = deposits.some(dep => dep >= loan * 0.1);

  if(rule10Percent){
    currentlyLoggedIn.movements.push(loan);

    inputLoanAmount.value = '';

    login(currentlyLoggedIn);
  }

}

const sortMovements = function(){
  const sortedMovements = [...currentlyLoggedIn.movements].sort((a, b) => a - b);

  showMovements(sorted ? currentlyLoggedIn.movements : sortedMovements);
  sorted = !sorted;
}

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
 
  sortMovements();
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

const diameter = 287_460_000_000;
const price = 1499_99;

console.log(Number('102_12'));
console.log(typeof(NaN));