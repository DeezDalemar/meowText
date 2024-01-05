"use strict";

const feedsContainer = document.querySelector("#feeds");
const userName = document.querySelector(".user-name");
const bioTextDisplay = document.querySelector("#bioTextDisplay");
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
   "We've noticed that you recently have been shopping for ''fursuits'' we'll now recommend these to you.",
];

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

   userName.innerText = data.fullName + "\n" + data.username;
   bioTextDisplay.innerText = data.bio;
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

const placeholderImages = [
   "../images/he-he-cat.png",
   "../images/tom.png",
   // Add more image URLs as needed
];

function createFeedElement(post) {
   let feed = document.createElement("div");
   feed.className = "feed";

   let head = document.createElement("div");
   head.className = "head";

   let user = document.createElement("div");
   user.className = "user";

   let profilePhoto = document.createElement("div");
   profilePhoto.className = "feed-profile-photo";

  let profilePFP = document.createElement("img");
  profilePFP.className = "profile-photo"

   // Randomly select an image from the placeholderImages array
   const randomImageIndex = Math.floor(Math.random() * placeholderImages.length);
   profilePFP.src = placeholderImages[randomImageIndex];

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

   // Check for image URLs in post text
   const imageUrlRegex = /https:\/\/[^\s]+/g;
   const matches = post.text.match(imageUrlRegex);

   if (matches) {
      // If image URLs are found, create image elements
      matches.forEach((imageUrl) => {
         const imageElement = document.createElement("img");
         imageElement.className = "postImg";
         imageElement.src = imageUrl;
         photo.appendChild(imageElement);
      });

      // Display the text without the image URLs
      postContent.innerText = post.text.replace(imageUrlRegex, "");
   } else {
      // If no image URLs are found, use the original post text
      postContent.innerText = post.text;
   }

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

   let heartIconContainer = document.createElement("div");
   heartIconContainer.className = "heart-icon-container";

   let emptyHeartIcon = document.createElement("img");
   emptyHeartIcon.src = "../imgs/heart.png";
   emptyHeartIcon.className = "heart-icon";
   emptyHeartIcon.id = "empty" + post._id;
   emptyHeartIcon.dataset.postId = post._id;
   emptyHeartIcon.addEventListener("click", toggleLike);

   let filledHeartIcon = document.createElement("img");
   filledHeartIcon.src = "../imgs/heart (1).png";
   filledHeartIcon.className = "heart-icon filled-heart";
   filledHeartIcon.id = "filled" + post._id;
   filledHeartIcon.dataset.postId = post._id;
   filledHeartIcon.style.display = "none";
   filledHeartIcon.addEventListener("click", toggleLike);

   heartIconContainer.appendChild(emptyHeartIcon);
   heartIconContainer.appendChild(filledHeartIcon);

   profilePhoto.appendChild(profilePFP);
   user.appendChild(profilePhoto);
   user.appendChild(info);
   info.appendChild(userName);
   info.appendChild(whenPosted);
   head.appendChild(user);
   head.appendChild(editIconContainer);
   editIconContainer.appendChild(editIcon);
   feed.appendChild(head);
   feed.appendChild(photo);
   photo.appendChild(postContent);
   feed.appendChild(likedBy);
   feed.appendChild(caption);
   feed.appendChild(photo);
   caption.appendChild(likeText);

   feed.appendChild(heartIconContainer);

   return feed;
}

async function createYourMessages() {
   let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=1000", {
      method: "GET",
      headers: {
         Authorization: `Bearer ${getLoginData().token}`,
      },
   });

   let data = await response.json();

   for (const post of data) {
      const feed = createFeedElement(post);
      feedsContainer.appendChild(feed);
      totalLikes += post.likes.length;
   }

   console.log(totalLikes);
}

let likeId;

async function toggleLike() {
   const postId = event.target.dataset.postId;
   const emptyHeartIcon = document.getElementById("empty" + postId);
   const filledHeartIcon = document.getElementById("filled" + postId);

   if (emptyHeartIcon.style.display == "") {
      emptyHeartIcon.style.display = "none";
      filledHeartIcon.style.display = "";

      let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLoginData().token}`,
         },
         body: JSON.stringify({
            postId: postId,
         }),
      });

      let data = await response.json();
      likeId = data._id;
      console.log(likeId);
   } else if (filledHeartIcon.style.display == "") {
      emptyHeartIcon.style.display = "";
      filledHeartIcon.style.display = "none";
      console.log(likeId);
      let response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${likeId}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${getLoginData().token}`,
         },
      });
   }
}

async function createPost() {
   let postData = {
      text: postInput.value,
   };

   console.log(postInput.value);
   console.log(postData);

   let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getLoginData().token}`,
      },
      body: JSON.stringify(postData),
   });

   window.location.reload();
}

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
      const feed = createFeedElement(notification);
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
            const feed = createFeedElement(post);
            feedsContainer.appendChild(feed);
            totalLikes += post.likes.length;
         }
      });

   console.log(totalLikes);
}

function findYourLikedMessages() {
   feedsContainer.innerHTML = ""; // Clear existing posts

   let response = fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=1000`, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${getLoginData().token}`,
      },
   })
      .then((response) => response.json())
      .then((data) => {
         for (const post of data) {
            const findIfLiked = post.likes.find((currentPost) => getLoginData().username == currentPost.username);
            if (findIfLiked) {
               const feed = createFeedElement(post);
               feedsContainer.appendChild(feed);
            }
         }
      });
}

function showContent(tab) {
   console.log(`Showing ${tab} content`);
   if (tab === "Notifications") {
      const randomNotifications = generateRandomNotifications();
      createNotifications(randomNotifications);
   } else if (tab === "Post") {
      createYourMessages();
   } else if (tab == "Likes") {
      findYourLikedMessages();
   }
}
