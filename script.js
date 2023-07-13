'use strict';

// Selecting elements
const SignUpEl = document.getElementById('sign-up-btn');
const SignInEl = document.getElementById('sign-in-btn');
const containerEl = document.querySelector('.container');
const messageEl1 = document.querySelector('.message');
const messageEl2 = document.querySelector('.message2');

// Selecting buttons
const btnSignUp = document.querySelector('.sign-up');
const btnSignIn = document.querySelector('.sign-in');

// Declaring main variables
let users = [];
let count = 1;

SignUpEl.addEventListener('click', () => {
  containerEl.classList.add('sign-up-mode');
  resetSignIn();
});

SignInEl.addEventListener('click', () => {
  containerEl.classList.remove('sign-up-mode');
  resetSignUp();
});

const getData = function () {
  users = [];
  for (let j = 0; j < window.localStorage.length; j++) {
    let storage = window.localStorage.getItem(`user${j}`);
    let word = '';
    let temp = [];
    if (storage !== null) {
      for (let i = 0; i < storage.length; i++) {
        if (storage[i] !== ',') {
          word += storage[i];
        } else {
          if (temp.length % 2 !== 0 || temp.length === 0) {
            temp.push(word);
            word = '';
          } else {
            console.log('enter else block');
            users.push(temp);
            temp = [];
          }
        }
      }
      temp.push(word);
      users.push(temp);
    }
  }
  count = Number(window.localStorage.getItem('count'));
};

const resetSignUp = function () {
  setTimeout(() => {
    document.querySelector('.sign-up-email').value = '';
    document.querySelector('.sign-up-username').value = '';
    document.querySelector('.sign-up-password').value = '';
    messageEl1.classList.add('hide');
    messageEl1.classList.remove('success');
  }, 1500);
};

const resetSignIn = function () {
  setTimeout(() => {
    document.querySelector('.username').value = '';
    document.querySelector('.password').value = '';
    messageEl2.classList.add('hide');
    messageEl2.classList.remove('success');
  }, 1500);
};

const printInvalidMessage = function (username, email, password) {
  if (username === '' && email === '' && password === '') {
    messageEl1.textContent = 'please! enter username, email and password';
  } else if (username === '' && email === '') {
    messageEl1.textContent = 'please! enter username and email';
  } else if (username === '' && password === '') {
    messageEl1.textContent = 'please! enter username and password';
  } else if (email === '' && password === '') {
    messageEl1.textContent = 'please! enter email and password';
  } else if (username === '') {
    messageEl1.textContent = 'please! enter username';
  } else if (email === '') {
    messageEl1.textContent = 'please! enter email';
  } else if (password === '') {
    messageEl1.textContent = 'please! enter password';
  } else {
    return false;
  }
  return true;
};

const checkUserName = function (username) {
  if (username.includes(' ')) {
    messageEl1.classList.remove('hide');
    messageEl1.textContent = "username shouldn't contain spaces";
  } else if (username.length < 7) {
    messageEl1.classList.remove('hide');
    messageEl1.textContent = 'username must contain at least 7 characters';
  } else {
    return true;
  }
  return false;
};

const checkEmail = function (email) {
  if (!email.includes('@') || email.slice(-4) !== '.com') {
    messageEl1.classList.remove('hide');
    messageEl1.textContent = 'Invalid email';
  } else {
    return true;
  }
  return false;
};

const containsSpecailCharacter = function (password) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(password);
};

const checkPassword = function (password) {
  if (!containsSpecailCharacter(password)) {
    messageEl1.classList.remove('hide');
    messageEl1.textContent = 'password must contain special character';
  } else if (password.length < 8) {
    messageEl1.classList.remove('hide');
    messageEl1.textContent = 'password must contain at least 8 characters';
  } else {
    return true;
  }
  return false;
};

btnSignUp.addEventListener('click', () => {
  // Selecting sign up elements
  const email = document.querySelector('.sign-up-email').value;
  const username = document.querySelector('.sign-up-username').value;
  const password = document.querySelector('.sign-up-password').value;

  if (printInvalidMessage(username, email, password)) {
    messageEl1.classList.remove('hide');
  } else {
    messageEl1.classList.add('hide');
  }

  if (checkUserName(username) && checkEmail(email) && checkPassword(password)) {
    messageEl1.classList.remove('hide');
    messageEl1.classList.add('success');
    messageEl1.textContent = 'Successfull !';
    resetSignUp();
  }

  window.localStorage.setItem(`user${count}`, [
    username.toLowerCase(),
    password.toLowerCase(),
  ]);
  count++;
  window.localStorage.setItem('count', count);
  getData();
});

const signIn = function (username, password) {
  messageEl2.classList.remove('hide');
  if (username === '' || password === '') {
    messageEl2.textContent = 'please enter email and password';
  } else {
    for (const [name, pass] of users) {
      if (name === username && pass == password) {
        messageEl2.classList.add('success');
        messageEl2.textContent = 'Successfull !';
        resetSignIn();
        return;
      }
    }
    messageEl2.textContent = 'Invalid email or password';
  }
};

btnSignIn.addEventListener('click', () => {
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  signIn(username.toLowerCase(), password.toLowerCase());
});

getData();
