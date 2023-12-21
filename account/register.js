"use strict";

const emailInput = document.querySelector("#emailInput");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const confirmPassword = document.querySelector("#confirmPassword");

const submitButton = document.querySelector("#submitButton")

submitButton.addEventListener("click", registerUser)


function registerUser() {
   if (passwordInput.value != confirmPassword.value) {
      console.log("passwords didnt match");
   }

    if (
        emailInput.value.trim() === "" ||
      usernameInput.value.trim() === "" ||
      passwordInput.value.trim() === "" ||
      confirmPassword.value.trim() === ""
   ) {
      console.log("submit all fields before submitting");
  
   }

   registerNewUser(emailInput, usernameInput, passwordInput);
}



function registerNewUser(emailInput, usernameInput, passwordInput) {
   alert("Registration successful! You can now log in.");
}


async function createAccount() {
   let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(getSignInData()),
   });
}

function getSignInData() {
   let userInfo = {
      username: username.value,
      fullName: fullName.value,
      password: password.value,
   };

   return userInfo;
}
