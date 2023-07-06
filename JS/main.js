var typed = new Typed(".text", {
  strings: [
    "Web Developer",
    "CyberSec Buff",
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
circles.forEach((elem) => {
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

const slideLeftAnchor1 = document.querySelectorAll(".slide-top-1");
slideLeftAnchor1.forEach((el) => observer.observe(el));

const slideLeftAnchor2 = document.querySelectorAll(".slide-top-2");
slideLeftAnchor2.forEach((el) => observer.observe(el));

const slideLeftAnchor3 = document.querySelectorAll(".slide-top-3");
slideLeftAnchor3.forEach((el) => observer.observe(el));

const slideLeftAnchor4 = document.querySelectorAll(".slide-top-4");
slideLeftAnchor4.forEach((el) => observer.observe(el));

// skills section carousel ///////////////

const skill_details = document.querySelector(".skill_details");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".skill_details i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!skill_details.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  // Autoplay the carousel after every 2000 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2000);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
skill_details.addEventListener("mouseenter", () => clearTimeout(timeoutId));
skill_details.addEventListener("mouseleave", autoPlay);

// menu for toggling between technical and professional skills

var divs = ["technical_menu", "professional_menu"];
var visibleDivId = null;
function toggleVisibility(divId) {
  if (visibleDivId === divId) {
    //visibleDivId = null;
  } else {
    visibleDivId = divId;
  }
  hideNonVisibleDivs();
}
function hideNonVisibleDivs() {
  var i, divId, div;
  for (i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if (visibleDivId === divId) {
      div.style.display = "flex";
    } else {
      div.style.display = "none";
    }
  }
}
