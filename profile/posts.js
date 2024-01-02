/* Posts Page JavaScript */
"use strict";
const feedsContainer = document.querySelector("#feeds");

function timeAgo(timestamp) {
   const currentDate = new Date();
   const postDate = new Date(timestamp);
   const seconds = Math.floor((currentDate - postDate) / 1000);
    //yes i really calculated the seconds
    //help
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

async function createCustomCard() {
   let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=1000", {
      method: "GET",
      headers: {
         Authorization: `Bearer ${getLoginData().token}`,
      },
   });

   let data = await response.json();

   for (const post of data) {
      console.log(post);

      let feed = document.createElement("div");
      feed.className = "feed";

      let head = document.createElement("div");
      head.className = "head";

      let user = document.createElement("div");
      user.className = "user";

      let profilePhoto = document.createElement("div");
      profilePhoto.className = "profile-photo";

      let profilePFP = document.createElement("img");
      profilePFP.src = "https://placehold.co/50x50";

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
      caption.appendChild(likeText);

    //    if (postContent.innerText.includes("test")) { 
    //        feedsContainer.appendChild(feed);
    //    }
      feedsContainer.appendChild(feed);
       
      
   }
}

createCustomCard();
