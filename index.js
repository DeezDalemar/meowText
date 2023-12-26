const loginLink = document.querySelector("#loginLink");
const logoutLink = document.querySelector("#logoutLink");
const greetingSpan = document.querySelector("#greetingSpan");
if (isLoggedIn() == true) {
   loginLink.style.display = "none";
} else {
   greetingSpan.style.display = "none";
   logoutLink.style.display = "none";
}
