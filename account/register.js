let username;
let password;
let fullName;

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
    }
    
    return userInfo
}
