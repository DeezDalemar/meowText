// Replace this with your actual API endpoint URL
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

// Fetch and display current user information
fetch(`${apiBaseURL}/api/users/${getLoginData().username}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      const user = data.user;
      document.getElementById("currentName").textContent = user.name;
      document.getElementById("currentUsername").textContent = user.username;
    } else {
      document.getElementById("currentInfo").innerHTML = "<p>Failed to fetch current information.</p>";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    document.getElementById("currentInfo").innerHTML = "<p>An error occurred while fetching current information.</p>";
  });

// Add event listener to the form for updating user information
document.getElementById("editForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Make an API request to update the user's profile
  fetch(`${apiBaseURL}/api/update-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("message").textContent = "Profile updated successfully!";
      } else {
        document.getElementById("message").textContent = "Failed to update profile. Please try again.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("message").textContent = "An error occurred while updating your profile.";
    });
});
