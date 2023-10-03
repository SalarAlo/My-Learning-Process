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

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
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
    .reduce((accu, mov) => accu + mov);
  
  

  const withdrewsSum = noWithdrews ? 0 : movements
    .filter(mov => mov < 0)
    .reduce((accu, mov) => accu + mov);

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2 / 100)
    .filter(interest => interest >= 1)
    .reduce((accu, interest) => accu + interest);

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
      <div class="movements__value">${mov}€</div>
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
