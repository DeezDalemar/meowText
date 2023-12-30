/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");
const incorrectPhrase = document.querySelector("#incorrectPhrase");

loginForm.onsubmit = async function (event) {
   event.preventDefault();

   const loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
   };

   try {
      await login(loginData);
      // If login is successful, you can redirect or perform other actions here.
      console.log("Login successful");
   } catch (error) {
      // If login fails, display incorrect phrase and re-enable the login button.
      incorrectPhrase.style.display = "block";
      loginForm.loginButton.disabled = false;
      console.error("Login failed:", error);
   }

   console.log("Username:", loginForm.username.value, "Password:", loginForm.password.value);
};
