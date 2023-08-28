'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mohamed Shehab',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-04-18T21:31:17.178Z',
    '2023-05-23T07:42:02.383Z',
    '2023-06-28T09:15:04.904Z',
    '2023-07-01T10:17:24.185Z',
    '2023-07-08T14:11:59.604Z',
    '2023-08-20T17:01:17.194Z',
    '2023-08-24T23:36:17.929Z',
    '2023-08-26T10:51:36.790Z',
  ],
  currency: 'EUR', // Euro
  locale: 'en-US', // English - United States
};

const account2 = {
  owner: 'David Mike',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-01-01T13:15:33.035Z',
    '2023-02-30T09:48:16.867Z',
    '2023-03-25T06:04:23.907Z',
    '2023-03-25T14:18:46.235Z',
    '2023-04-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-05-25T18:49:59.371Z',
    '2023-08-26T12:01:20.894Z',
  ],
  currency: 'GBP', // Brithish Pound
  locale: 'en-gb', // United Kingdom
};
const account3 = {
  owner: 'Omar Hosam',
  movements: [700, 455.23, -306.5, 25000, -642.21, -171.9, 79.97, 1300],
  interestRate: 1.25, // %
  pin: 3333,

  movementsDates: [
    '2023-01-18T21:31:17.178Z',
    '2023-01-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-08-08T14:11:59.604Z',
    '2023-08-12T17:01:17.194Z',
    '2023-08-15T23:36:17.929Z',
    '2023-08-17T10:51:36.790Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};
const account4 = {
  owner: 'Ahmed Mohamed',
  movements: [700, 455.23, -306.5, 25000, -642.21, -171.9, 79.97, 1300],
  interestRate: 1.5, // %
  pin: 4444,

  movementsDates: [
    '2023-03-18T21:31:17.178Z',
    '2023-03-23T07:42:02.383Z',
    '2023-04-28T09:15:04.904Z',
    '2023-05-01T10:17:24.185Z',
    '2023-07-08T14:11:59.604Z',
    '2023-08-12T17:01:17.194Z',
    '2023-08-15T23:36:17.929Z',
    '2023-08-17T10:51:36.790Z',
  ],
  currency: 'KWD', //Kuwait Dinar
  locale: 'ar-kw',
};
const account5 = {
  owner: 'Tom Jonas',
  movements: [700, 455.23, -306.5, 25000, -642.21, -171.9, 79.97, 1300],
  interestRate: 1.5, // %
  pin: 4444,

  movementsDates: [
    '2023-03-18T21:31:17.178Z',
    '2023-03-23T07:42:02.383Z',
    '2023-04-28T09:15:04.904Z',
    '2023-05-01T10:17:24.185Z',
    '2023-07-08T14:11:59.604Z',
    '2023-08-12T17:01:17.194Z',
    '2023-08-15T23:36:17.929Z',
    '2023-08-17T10:51:36.790Z',
  ],
  currency: 'EUR', //Dollar
  locale: 'en-US', //United States
};
const accounts = [account1, account2, account3, account4, account5];

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
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};
const formattedNumber = function (number) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
    useGrouping: false,
  }).format(number);
};
const gettingDateFormat = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  const differnce = Math.round(calcDaysPassed(new Date(), date));
  if (differnce === 0) {
    return 'Today';
  } else if (differnce === 1) return 'Yesterday';
  else if (differnce <= 7) return `${differnce} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovments = function (accs, sortCheck = false) {
  let mov = sortCheck
    ? accs.movements.slice().sort((a, b) => a - b)
    : accs.movements;
  containerMovements.innerHTML = ''; //making it empty first

  mov.forEach((element, index) => {
    //Dates are strings in ISO
    const date = gettingDateFormat(
      new Date(accs.movementsDates[index]),
      accs.locale
    );

    const check = element < 0 ? 'withdrawal' : 'deposit';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${check}">
            ${index + 1} ${element < 0 ? 'withdrawal' : 'deposit'}
    </div>
    <div class="movements__date">${date}</div>
    <div class="movements__value">${formattedNumber(element)}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const userNameGenerator = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .split(' ')
      .map(item => item[0])
      .join('')
      .toLowerCase();
  });
};
userNameGenerator(accounts);
const displayBalance = function (accs) {
  const balance = accs.movements.reduce((acc, cur) => (acc += cur), 0);
  accs.balance = balance;
  labelBalance.textContent = formattedNumber(balance);
};
const descriptionOfBalance = function (accounts) {
  let incomes = accounts.movements
    .filter(item => item > 0)
    .reduce((acc, cur) => acc + cur, 0);
  let outcomes = Math.abs(
    accounts.movements
      .filter(item => item < 0)
      .reduce((acc, cur) => acc + cur, 0)
  );

  let balance = accounts.movements
    .filter(item => item > 0)
    .map(cur => (cur *= accounts.interestRate / 100))
    .filter(cur => cur > 1)
    .reduce((acc, int) => (acc += int));
  outcomes = +outcomes.toFixed(2);
  incomes = +incomes.toFixed(2);
  balance = +balance.toFixed(2);

  labelSumIn.textContent = formattedNumber(incomes);
  labelSumOut.textContent = formattedNumber(outcomes);
  labelSumInterest.textContent = formattedNumber(balance);
};
const timerLogout = function () {
  //putting the timer to 5 seconds
  let time = new Date(0, 0, 0, 0, 5, 0);
  let timer = 5 * 60;
  const tick = function () {
    labelTimer.textContent = new Intl.DateTimeFormat(currentAccount?.locale, {
      minute: 'numeric',
      second: 'numeric',
    }).format(time);
    // decreasing the timer by 1000 millseconds which is one second
    if (timer === 0) {
      clearInterval(timerFunction);
      //Hiding UI
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      alert('You have been logged out');
    }
    timer--;
    time -= 1000;
  };
  tick();
  const timerFunction = setInterval(tick, 1000);
  return timerFunction;
};
let currentAccount, receiver, timerFunction;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value ? true : false) {
    //showing the page
    containerApp.style.opacity = 1;
    //clearing the input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    //removing the cursor from the field
    inputLoginPin.blur();
    inputCloseUsername.blur();
    // welcoming the user
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;
    //showing the current date and the time.
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());
    //showing the data of the account
    descriptionOfBalance(currentAccount);
    displayBalance(currentAccount);
    displayMovments(currentAccount);
  } else {
    currentAccount?.pin
      ? alert('The password is wrong')
      : alert('The username is invalid');
  }
  // checking if there is a timer running then stop it
  if (timerFunction) clearInterval(timerFunction);
  timerFunction = timerLogout();
});
const updateUI = function (acc) {
  descriptionOfBalance(acc);
  displayBalance(acc);
  displayMovments(acc);
};
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amounOfTransaction = +inputTransferAmount.value;
  receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  if (
    receiver &&
    amounOfTransaction < currentAccount.balance &&
    amounOfTransaction > 0 &&
    receiver?.username !== currentAccount.username
  ) {
    currentAccount.balance -= amounOfTransaction;
    labelBalance.textContent = `${currentAccount.balance}$`;
    currentAccount.movements.push(-amounOfTransaction);
    receiver.movements.push(amounOfTransaction);
    //pushing the date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiver.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    //clearing the input fields
    inputTransferAmount.value = inputTransferTo.value = '';
    //removing the cursor from the field
    inputTransferAmount.blur();
    inputTransferTo.blur();
  } else {
    if (!receiver) alert('There is no account got such name');
    else if (amounOfTransaction > currentAccount.balance)
      alert("You don't have enough money");
    else if (amounOfTransaction < 0) alert("You can't enter negative +");
    else alert("You can't transfer money to yourself!");
  }
  //reset the timer if he made a transaction
  if (timerFunction) clearInterval(timerFunction);
  timerFunction = timerLogout();
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const indexOfAccount = accounts.findIndex(
      acc => currentAccount.username === acc.username
    );
    //Deleting account
    accounts.splice(indexOfAccount, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
    inputCloseUsername.blur();
    //Hiding UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    alert('Your account has been deleted');
  } else if (inputCloseUsername.value != currentAccount.username)
    alert('Wrong username entered!');
  else alert('Wrong password entered!');
  //reset the timer if he closed his account
  if (timerFunction) clearInterval(timerFunction);
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const requestedloan = Math.floor(+inputLoanAmount.value);
  //if there is any deposite is more than 10% of requested loan then accept it
  alert('It will take 5 seconds to answer your request');
  setTimeout(() => {
    if (currentAccount.movements.some(item => item >= requestedloan / 10)) {
      //takes 3 seconds to answer

      alert('Your loan has been accepted');
      currentAccount.movements.push(requestedloan);
      // adding current date
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    } else alert('Unfortunately, Your loan has been refused');
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    //reset the timer if he requested a loan
    if (timerFunction) clearInterval(timerFunction);
    timerFunction = timerLogout();
  }, 5000);
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (!sorted) displayMovments(currentAccount, true);
  else displayMovments(currentAccount, false);
  // if it's true then we change it to false and otherwise
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// console.log(Math.max(2, 5, 7, 6, 7, 10, 257, '200px'));
// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1) + min);
// console.log(randomInt(10, 20));
// console.log(Math.round('2.49'));
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 - 1);

// const now = new Date();
// console.log(now);
// console.log(new Date(`${account1.movementsDates[0]}`));
// console.log(new Date(2012, 10, 5, 23, 1, 5));

// console.log(calcDaysPassed(+new Date(2012, 12, 5), +new Date(2012, 12, 8)));
// const optionsss = {
//   style: 'unit',
//   unit: 'mile-per-hour',
// };

// console.log(Intl.NumberFormat('ar-SY', optionsss).format(2443.25));
// console.log(Intl.NumberFormat(navigator.language, optionsss).format(2443.25));
// const ingredients = ['salad', 'tomato'];
// setTimeout(
//   (ing1, ing2) => console.log(`I like pizza with ${ing1} and ${ing2}🍕`),
//   3000,
//   ingredients[0],
//   ingredients[1]
// );
// setInterval(() => {
//   console.log(new Date());
// }, 2000);

// setInterval(() => {
//   console.log(
//     new Intl.DateTimeFormat('en-US', {
//       hour: '2-digit',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(new Date())
//   );
// }, 2000);
