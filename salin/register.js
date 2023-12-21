"use strict";
function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
    alert("Please fill in all fields before submitting.");
    return;
  }

  //   console.log("Registration successful! You can now log in.");
  registerNewUser(username, password);
}

registerUser();

function registerNewUser(username, password) {
  alert("Registration successful! You can now log in.");
  window.location.href = "";
}
