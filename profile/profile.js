"use strict";

const feedsContainer = document.querySelector("#feeds");
const userName = document.querySelector(".user-name");

let totalLikes = 0;

window.onload = displayInfo;

async function displayInfo() {
   let response = await fetch(
      `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${getLoginData().username}`,
      {
         method: "GET",
         headers: {
            Authorization: `Bearer ${getLoginData().token}`,
         },
      }
   );
   let data = await response.json();

   userName.innerText = data.fullName;
}

function timeAgo(timestamp) {
   const currentDate = new Date();
   const postDate = new Date(timestamp);
   const seconds = Math.floor((currentDate - postDate) / 1000);

   if (seconds < 60) {
      return `${seconds} seconds ago`;
   } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
   } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
   } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
   } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
   } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
   }
}

const randomMessages = [
   "Just wanted to say hi!",
   "What's up, @username?",
   "How's your day going?",
   "Here's a random notification for you!",
   "Hope you're having a great day!",
   "Cheers to another notification!",
   "Random message from @username!",
   "Your cooked buddy",
   "I know where you live",
   "Cheese, why cause I can",
   "hows your dad?",
   "wanna play chess?",
   "thats your fault",
   "WHAT EVEN IS A KILLOMETER!?!?!",
   "i love indie rpgs!!!",
   "Hey, its me, your neighbor. TURN DOWN YOUR MUSIC, gosh. Thanks in advance -Steve.",
   "hey is this your kid in my yard?",
   "have you done your spanish lessons -duolingo",
  "125.178.149.108",
  "We've noticed that you recently have been shopping for ''fursuits'' we'll now reccomend these to you.",
  
   
];

function generateRandomNotifications() {
   const notifications = [];
   const currentUsername = getLoginData().username;

   for (let i = 0; i < 10; i++) {
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const notification = {
         username: `username${i}`,
         text: `@${currentUsername} ${randomMessage}`,
         createdAt: new Date().toISOString(),
         likes: [],
      };
      notifications.push(notification);
   }
   return notifications;
}

function createNotifications(notifications) {
   feedsContainer.innerHTML = ""; // Clear existing posts

   for (const notification of notifications) {
      let feed = document.createElement("div");
      feed.className = "feed";

      let head = document.createElement("div");
      head.className = "head";

      let user = document.createElement("div");
      user.className = "user";

      let info = document.createElement("div");
      info.className = "info";

      let userName = document.createElement("h3");
      userName.innerText = notification.username;

      let whenPosted = document.createElement("small");
      whenPosted.innerText = timeAgo(notification.createdAt);

      let editIconContainer = document.createElement("span");
      editIconContainer.className = "edit";

      let editIcon = document.createElement("i");
      editIcon.className = "uil uil-ellipsis-h";

      let photo = document.createElement("div");
      photo.className = "photo";

      let postContent = document.createElement("p");
      postContent.innerText = notification.text;

      let likedBy = document.createElement("div");
      likedBy.className = "liked-by";

      let caption = document.createElement("div");
      caption.className = "caption";

      let likeText = document.createElement("p");
      likeText.innerHTML = "Nobody liked that...";

      user.appendChild(info);
      info.appendChild(userName);
      info.appendChild(whenPosted);
      head.appendChild(user);
      head.appendChild(editIconContainer);
      editIconContainer.appendChild(editIcon);
      feed.appendChild(head);
      photo.appendChild(postContent);
      feed.appendChild(likedBy);
      feed.appendChild(caption);
      feed.appendChild(photo);
      caption.appendChild(likeText);

      feedsContainer.appendChild(feed);
   }
}

function createYourMessages() {
   feedsContainer.innerHTML = ""; // Clear existing posts

   let response = fetch(
      `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=1000&username=${getLoginData().username}`,
      {
         method: "GET",
         headers: {
            Authorization: `Bearer ${getLoginData().token}`,
         },
      }
   )
      .then((response) => response.json())
      .then((data) => {
         for (const post of data) {
            let feed = document.createElement("div");
            feed.className = "feed";

            let head = document.createElement("div");
            head.className = "head";

            let user = document.createElement("div");
            user.className = "user";

            let info = document.createElement("div");
            info.className = "info";

            let userName = document.createElement("h3");
            userName.innerText = post.username;

            let whenPosted = document.createElement("small");
            whenPosted.innerText = timeAgo(post.createdAt);

            let editIconContainer = document.createElement("span");
            editIconContainer.className = "edit";

            let editIcon = document.createElement("i");
            editIcon.className = "uil uil-ellipsis-h";

            let photo = document.createElement("div");
            photo.className = "photo";

            let postContent = document.createElement("p");
            postContent.innerText = post.text;

            let likedBy = document.createElement("div");
            likedBy.className = "liked-by";

            let caption = document.createElement("div");
            caption.className = "caption";

            let likeText = document.createElement("p");
            if (post.likes.length == 1) {
               likeText.innerHTML = "Liked by <strong>" + post.likes[0].username + "</strong>";
            } else if (post.likes.length > 1) {
               likeText.innerHTML =
                  "Liked by <strong>" +
                  post.likes[0].username +
                  "</strong> and <strong>" +
                  (post.likes.length - 1) +
                  " others</strong>";
            } else {
               likeText.innerHTML = "Nobody liked that...";
            }

            user.appendChild(info);
            info.appendChild(userName);
            info.appendChild(whenPosted);
            head.appendChild(user);
            head.appendChild(editIconContainer);
            editIconContainer.appendChild(editIcon);
            feed.appendChild(head);
            photo.appendChild(postContent);
            feed.appendChild(likedBy);
            feed.appendChild(caption);
            feed.appendChild(photo);
            caption.appendChild(likeText);

            feedsContainer.appendChild(feed);
            totalLikes += post.likes.length;
         }
      });

   console.log(totalLikes);
}

function showContent(tab) {
   // Implement logic to show content based on the selected tab
   console.log(`Showing ${tab} content`);
   if (tab === "Notifications") {
      const randomNotifications = generateRandomNotifications();
      createNotifications(randomNotifications);
   } else if (tab === "Post") {
      createYourMessages();
   }
}
