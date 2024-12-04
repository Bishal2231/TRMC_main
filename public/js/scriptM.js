var navLinks = document.getElementById("navLinks");
// var body=document.querySelector('body')
function showMenu() {
  navLinks.style.right = "0";
  navLinks.style.zIndex = "5000";
 


//   const getElementById()
}
function hideMenu() {
  navLinks.style.right = "-200px";
  navLinks.style.zIndex = "5000";
  // body.style.zIndex = "-100";
}

// temporary start

// const button=document.getElementById('button')
// const form=document.getElementById('homepage')
// button.addEventListener("click",()=>{
//   form.submit()

// })

// temportary end
const userOption=document.querySelector('.open')
const avatarpic=document.querySelector('.avatarpic')

// avatarpic.document.addEventListener("click",()=>{
// useroption.style.display="block"



// if (userOption.style.display === 'none') {
//   userOption.style.display = 'flex';
// } else {
//   userOption.style.display = 'none';
// }

// })

// var navLinks = document.getElementById("navLinks");

// function showMenu() {
//   navLinks.style.right = "0";
// }
// function hideMenu() {
//   navLinks.style.right = "-200px";
// }
// const userpp=document.querySelector(".profile-user")   
// const useropt=document.querySelector(".dropdown-content")   

// userpp.addEventListener("click",()=>{
//   console.log("clicked")
// })

// document.addEventListener("DOMContentLoaded", () => {
//   const userpp = document.querySelector(".profile-user");
//   const useropt = document.querySelector(".dropdown-content");
  
//   userpp.addEventListener("click", () => {
//     console.log("clicked");
//   });
// });

// document.getElementById('signupButton').addEventListener('click', function() {
//   var signupButton = document.getElementById('signupButton');
//   var spinner = document.getElementById('spinner');
//   var message = document.getElementById('message');

//   signupButton.disabled = true; // Disable the button
//   signupButton.innerText = 'Signing up...'; // Change button text
//   spinner.style.display = 'block'; // Show the spinner
//   message.innerText = ''; // Clear any previous message

//   // Simulate a signup process with a timeout
//   setTimeout(function() {
//       signupButton.disabled = false; // Re-enable the button
//       signupButton.innerText = 'Sign up'; // Reset button text
//       spinner.style.display = 'none'; // Hide the spinner
//       message.innerText = 'Signup successful!'; // Show success message
//   }, 5000); // 5 seconds delay
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const btn = document.getElementById('signupButton');
//   const load=document.getElementById('loading')
//   const loading=document.querySelector('.loading')
// loading.style.display='none';
   
// btn.addEventListener('click',()=>{

// })
//   if (btn) {
//       btn.addEventListener("click", () => {
//           console.log("clicked");
//           loading.style.display='block';
//       });
//   } else {
//       console.error("Signup button not found in the DOM.");
//   }
// });
// document.addEventListener('DOMContentLoaded', function() {
//   const cross=document.querySelector(".close-icon")
//   const menu=document.querySelector(".menu-icon")
//   const menuShowing=true;
// console.log(cross);
// if(cross&&menu){
//   // cross.style.display="none"
//   // menu.style.display="none"

// }


// })

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  // Function to show or hide the menu icon based on window width
  function handleResize() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 959) {
      menuIcon.style.display = "block"; // Show hamburger icon
      closeIcon.style.display = "none"; // Hide cross icon
    } else {
      menuIcon.style.display = "none"; // Hide hamburger icon
      closeIcon.style.display = "none"; // Hide cross icon
    }
  }

  // Event listener for the menu icon click
  menuIcon.addEventListener("click", function () {
    menuIcon.style.display = "none"; // Hide hamburger icon
    closeIcon.style.display = "block"; // Show cross icon
  });

  // Event listener for the close icon click
  closeIcon.addEventListener("click", function () {
    closeIcon.style.display = "none"; // Hide cross icon
    menuIcon.style.display = "block"; // Show hamburger icon
  });

  // Listen for window resize events
  window.addEventListener("resize", handleResize);

  // Initial setup based on current viewport width
  handleResize();
});



