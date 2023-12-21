"use strict";

function registerUser() {
  const emailInput = document.getElementById("emailInput").value;
  const usernameInput = document.getElementById("usernameInput").value;
  const passwordInput = document.getElementById("passwordInput").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (passwordInput !== confirmPassword) {
    alert("Password do not match!");
    return;
  }

  if (
    emailInput.trim() === "" ||
    usernameInput.trim() === "" ||
    passwordInput.trim() === "" ||
    confirmPassword.trim() === ""
  ) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  registerNewUser(emailInput, usernameInput, passwordInput);
}

registerUser();

function registerNewUser(emailInput, usernameInput, passwordInput) {
  alert("Registration successful! You can now log in.");
  window.location.href = "";
}
