var typed = new Typed(".text", {
  strings: [
    "Web Developer",
    "Cyber Security Enthusiast",
    "Software Developer",
    "Network Analyst",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1000,
  loop: true,
});

// circle skill ////////////////////////

const circles = document.querySelectorAll(".circle");
circles.forEach(elem => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});

// Following lines of code do all the listed tasks:-

// -> toggle menu button
// -> sticky navbar
// -> active navbar buttons
// -> animations on section scroll

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
let header_color = document.querySelector(".header");
let header = document.querySelector("header");
let navLinks = document.querySelectorAll("header ul li a");
let sections = document.querySelectorAll("section");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
  header_color.classList.toggle("color");
};

window.onscroll = () => {
  header.classList.toggle("sticky", window.scrollY > 100);
  menuIcon.classList.remove("bx-x");
  navlist.classList.remove("open");
  header_color.classList.remove("color");

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header ul a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// mix it up portfolio section //////////////
var mixer = mixitup(".portfolio-gallery");

// animations on scroll ////////////////////////

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const slideBottom = document.querySelectorAll(".slide-bottom");
slideBottom.forEach((el) => observer.observe(el));

const slideTop = document.querySelectorAll(".slide-top");
slideTop.forEach((el) => observer.observe(el));

const slideRight = document.querySelectorAll(".slide-right");
slideRight.forEach((el) => observer.observe(el));

const slideLeft = document.querySelectorAll(".slide-left");
slideLeft.forEach((el) => observer.observe(el));

const slideLeftAnchor1 = document.querySelectorAll(".slide-left-1");
slideLeftAnchor1.forEach((el) => observer.observe(el));

const slideLeftAnchor2 = document.querySelectorAll(".slide-left-2");
slideLeftAnchor2.forEach((el) => observer.observe(el));

const slideLeftAnchor3 = document.querySelectorAll(".slide-left-3");
slideLeftAnchor3.forEach((el) => observer.observe(el));

const slideLeftAnchor4 = document.querySelectorAll(".slide-left-4");
slideLeftAnchor4.forEach((el) => observer.observe(el));
