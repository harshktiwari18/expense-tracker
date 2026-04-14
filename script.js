// Auth Check: if user is on dashboard.html without login, redirect
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const logoutBtn = document.getElementById('logout-btn');

// Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Check local storage for transactions
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// State management
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add a transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);

  updateValues();

  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on positive or negative value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} 
    <span class="amount">${sign}₹${Math.abs(transaction.amount).toFixed(2)}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense displays
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const totalSign = total < 0 ? '-' : '';

  balance.innerText = `${totalSign}₹${Math.abs(total).toFixed(2)}`;
  money_plus.innerText = `+₹${income}`;
  money_minus.innerText = `-₹${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init(); // we re-render the list from scratch
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize application
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
