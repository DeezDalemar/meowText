"use strict";

const fullnameInput = document.querySelector("#emailInput");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const confirmPassword = document.querySelector("#confirmPassword");

const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", registerUser);

function registerUser() {
   if (
      emailInput.value.trim() === "" ||
      usernameInput.value.trim() === "" ||
      passwordInput.value.trim() === "" ||
      confirmPassword.value.trim() === ""
   ) {
      console.log("submit all fields before submitting");
   } else if (passwordInput.value != confirmPassword.value) {
      console.log("passwords didnt match");
   } else {
      createAccount();
   }
}

async function createAccount() {
   let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(getSignInData()),
   });
   let data = await response.json();
   console.log(data);
   window.location.assign("http://127.0.0.1:5502/account/login.html");
}

function getSignInData() {
   let userInfo = {
      username: usernameInput.value,
      fullName: fullnameInput.value,
      password: passwordInput.value,
   };

   return userInfo;
}
