'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// api for currency change
const api = 'https://api.exchangerate-api.com/v4/latest/USD';

// Data
const account1 = {
  owner: 'Mohamed Shehab',
  movements: [200, 455.23, -306.5, 2500, -642.21, -133.9, 79.97, 1300],
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
  currency: 'EGP', //Egyptian Pound
  locale: 'ar-EG', // Egyptian Arabic
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
  currency: 'EUR', //Euro
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
const labelSumDebts = document.querySelector('.summary__value--debt');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.logout__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const loginForm = document.querySelector('.login');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanRequest = document.querySelector('.form__input--loan-request');
const inputLoanPay = document.querySelector('.form__input--loan-pay');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const formattedNumber = function (number, acc = currentAccount) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
    useGrouping: false,
  }).format(number);
};
//before starting
btnLogout.disabled = true;

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
    //checking if we passed an array or not if the array then we check if it's loan or transfer then we check if the loan is request or pay , and the transfer from which account to which account
    let check,
      amount = element,
      type;
    if (typeof element === 'object') {
      if (element.length == 2) {
        if (element[0] > 0) {
          type = 'Loan Requsted';
          check = 'loanRequested';
        } else {
          type = 'Debt Payment';
          check = 'loanPaid';
        }
      } else {
        if (element[0] > 0) {
          type = `transferd from ${element[2]}`;
        } else type = `transferd to ${element[2]}`;
        check = 'transfer';
      }
      amount = element[0];
    } else {
      check = element < 0 ? 'withdrawal' : 'deposit';
      type = check;
    }
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${check}">
            ${index + 1} ${type} 
    </div>
    <div class="movements__date">${date}</div>
    <div class="movements__value">${formattedNumber(amount)}</div>
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
  const balance = accs.movements
    .flat()
    .filter(item => typeof item === 'number')
    .reduce((acc, cur) => (acc += cur), 0);
  accs.balance = balance;
  labelBalance.textContent = formattedNumber(balance);
};
const descriptionOfBalance = function (accounts) {
  let incomes = accounts.movements
    .flat()
    .filter(item => item > 0)
    .reduce((acc, cur) => acc + cur, 0);
  let outcomes = Math.abs(
    accounts.movements
      .flat()
      .filter(item => item < 0)
      .reduce((acc, cur) => acc + cur, 0)
  );

  let balance = accounts.movements
    .flat()
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
      showingLogin();
    }
    timer--;
    time -= 1000;
  };
  tick();
  const timerFunction = setInterval(tick, 1000);
  return timerFunction;
};
const hidingLogin = function () {
  btnLogin.style.opacity = 0;
  inputLoginPin.style.opacity = 0;
  inputLoginUsername.style.opacity = 0;
  btnLogin.disabled = true;
  btnLogout.disabled = false;
  btnLogout.style.opacity = 1;
};
const showingLogin = function () {
  btnLogin.style.opacity = 1;
  inputLoginPin.style.opacity = 1;
  inputLoginUsername.style.opacity = 1;
  btnLogin.disabled = false;
  btnLogout.disabled = true;
  btnLogout.style.opacity = 0;
};
const updateUI = function (acc) {
  descriptionOfBalance(acc);
  displayBalance(acc);
  displayMovments(acc);
};
let currentAccount,
  receiver,
  timerFunction,
  currentDebts = 0,
  amounOfTransaction,
  receiveTransaction = 0;
function getResults() {
  fetch(`${api}`)
    .then(currency => {
      return currency.json();
    })
    .then(displayResults);
}
function displayResults(currency) {
  let fromRate = currency.rates[currentAccount.currency];
  let toRate = currency.rates[receiver.currency];
  receiveTransaction = (toRate / fromRate) * amounOfTransaction;
}
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount) labelSumDebts.textContent = formattedNumber(0);
  if (currentAccount?.pin === +inputLoginPin.value ? true : false) {
    //hiding login
    hidingLogin();
    //showing the page
    containerApp.style.opacity = 1;
    //clearing the input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    //removing the cursor from the field
    inputLoginPin.blur();
    inputCloseUsername.blur();
    // welcoming the user
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}.`;
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
      ? alert('The password is wrong.')
      : alert('The username is invalid.');
  }
  // checking if there is a timer running then stop it
  if (timerFunction) clearInterval(timerFunction);
  timerFunction = timerLogout();
});
btnLogout.addEventListener('click', function (e) {
  e.preventDefault();
  showingLogin();
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started.';
  alert('Your have been logged out.');
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  amounOfTransaction = +inputTransferAmount.value;
  receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  if (
    receiver &&
    amounOfTransaction < currentAccount.balance &&
    amounOfTransaction > 0 &&
    receiver?.username !== currentAccount.username
  ) {
    //clearing the input fields\
    getResults();
    inputTransferAmount.value = inputTransferTo.value = '';
    //removing the cursor from the field
    inputTransferAmount.blur();
    inputTransferTo.blur();
    setTimeout(() => {
      currentAccount.balance -= amounOfTransaction;
      labelBalance.textContent = `${currentAccount.balance}$`;
      currentAccount.movements.push([
        -amounOfTransaction,
        'transfer',
        receiver.owner,
      ]);
      receiver.movements.push([
        receiveTransaction,
        'transfer',
        currentAccount.owner,
      ]);
      alert(
        `You have sent ${formattedNumber(amounOfTransaction)} to ${
          receiver.owner
        } which equals ${formattedNumber(receiveTransaction, receiver)}.`
      );
      //pushing the date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiver.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2000);
  } else {
    if (!receiver) alert('There is no account got such name.');
    else if (amounOfTransaction > currentAccount.balance)
      alert("You don't have enough money.");
    else if (amounOfTransaction < 0) alert("You can't enter negative number.");
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
    labelWelcome.textContent = 'Log in to get started.';
    alert('Your account has been deleted.');
    showingLogin();
  } else if (inputCloseUsername.value != currentAccount.username)
    alert('Wrong username entered!');
  else alert('Wrong password entered!');
  //reset the timer if he closed his account
  if (timerFunction) clearInterval(timerFunction);
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const requestedloan = Math.floor(+inputLoanRequest.value);
  const paidloan = Math.floor(+inputLoanPay.value);
  //if there is any deposite is more than 10% of requested loan then accept it
  if (paidloan && requestedloan) {
    alert(`You can't do two transactions at the same time.`);
    inputLoanRequest.value = inputLoanPay.value = '';
    inputLoanRequest.blur();
    inputLoanPay.blur();
  } else {
    alert('It will take 3 seconds to answer your request.');
    inputLoanRequest.value = inputLoanPay.value = '';
    inputLoanRequest.blur();
    inputLoanPay.blur();
    setTimeout(() => {
      if (requestedloan) {
        if (currentAccount.movements.some(item => item >= requestedloan / 10)) {
          //takes 3 seconds to answer
          alert('Your loan has been accepted.');
          currentAccount.movements.push([requestedloan, 'loanRequested']);
          currentDebts += requestedloan;
        } else alert('Unfortunately, Your loan has been refused.');
      } else {
        if (currentAccount.balance > paidloan) {
          if (!currentDebts) {
            alert("You don't have any depts.");
          } else {
            alert(
              `You have paid ${formattedNumber(
                currentDebts > paidloan ? paidloan : currentDebts
              )} from your depts, ${
                currentDebts - paidloan <= 0
                  ? `you don't have depts anymore `
                  : `The remaning are: `
              }${formattedNumber(currentDebts - paidloan)}.`
            );
            if (paidloan > currentDebts) {
              currentAccount.movements.push([-currentDebts, 'loanPaid']);
              currentDebts = 0;
            } else {
              currentAccount.movements.push([-paidloan, 'loanPaid']);
              currentDebts -= paidloan;
            }
          }
        } else alert(`You don't have enough money.`);
      }
      // adding current date
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      // showing the current debts
      labelSumDebts.textContent = formattedNumber(currentDebts);
      //reset the timer if he requested a loan
      if (timerFunction) clearInterval(timerFunction);
      timerFunction = timerLogout();
    }, 3000);
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (!sorted) displayMovments(currentAccount, true);
  else displayMovments(currentAccount, false);
  // if it's true then we change it to false and otherwise
  sorted = !sorted;
});
