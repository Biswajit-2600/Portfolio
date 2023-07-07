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

// skills section carousel_tech ///////////////

const skill_details_tech = document.querySelector(".skill_details_tech");
const carousel_tech = document.querySelector(".carousel_tech");
const firstCardWidthTech =
  carousel_tech.querySelector(".card_tech").offsetWidth;
const arrowBtnsTech = document.querySelectorAll(".skill_details_tech i");
const carouselChildrensTech = [...carousel_tech.children];

let isdraggingTech = false,
  isautoPlayTech = true,
  startXTech,
  startScrollLeftTech,
  timeoutIdTech;

// Get the number of cards that can fit in the carousel_tech at once
let cardPerViewTech = Math.round(
  carousel_tech.offsetWidth / firstCardWidthTech
);

// Insert copies of the last few cards to beginning of carousel_tech for infinite scrolling
carouselChildrensTech
  .slice(-cardPerViewTech)
  .reverse()
  .forEach((card_tech) => {
    carousel_tech.insertAdjacentHTML("afterbegin", card_tech.outerHTML);
  });

// Insert copies of the first few cards to end of carousel_tech for infinite scrolling
carouselChildrensTech.slice(0, cardPerViewTech).forEach((card_tech) => {
  carousel_tech.insertAdjacentHTML("beforeend", card_tech.outerHTML);
});

// Scroll the carousel_tech at appropriate postition to hide first few duplicate cards on Firefox
carousel_tech.classList.add("no-transition");
carousel_tech.scrollLeft = carousel_tech.offsetWidth;
carousel_tech.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel_tech left and right
arrowBtnsTech.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel_tech.scrollLeft +=
      btn.id == "left" ? -firstCardWidthTech : firstCardWidthTech;
  });
});

const dragStarTech = (e) => {
  isdraggingTech = true;
  carousel_tech.classList.add("draggingTech");
  // Records the initial cursor and scroll position of the carousel_tech
  startXTech = e.pageX;
  startScrollLeftTech = carousel_tech.scrollLeft;
};

const draggingTech = (e) => {
  if (!isdraggingTech) return; // if isdraggingTech is false return from here
  // Updates the scroll position of the carousel_tech based on the cursor movement
  carousel_tech.scrollLeft = startScrollLeftTech - (e.pageX - startXTech);
};

const dragStopTech = () => {
  isdraggingTech = false;
  carousel_tech.classList.remove("draggingTech");
};

const infiniteScrollTech = () => {
  // If the carousel_tech is at the beginning, scroll to the end
  if (carousel_tech.scrollLeft === 0) {
    carousel_tech.classList.add("no-transition");
    carousel_tech.scrollLeft =
      carousel_tech.scrollWidth - 2 * carousel_tech.offsetWidth;
    carousel_tech.classList.remove("no-transition");
  }
  // If the carousel_tech is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel_tech.scrollLeft) ===
    carousel_tech.scrollWidth - carousel_tech.offsetWidth
  ) {
    carousel_tech.classList.add("no-transition");
    carousel_tech.scrollLeft = carousel_tech.offsetWidth;
    carousel_tech.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoPlayTech if mouse is not hovering over carousel_tech
  clearTimeout(timeoutIdTech);
  if (!skill_details_tech.matches(":hover")) autoPlayTech();
};

const autoPlayTech = () => {
  // autoPlayTech the carousel_tech after every 2000 ms
  timeoutIdTech = setTimeout(
    () => (carousel_tech.scrollLeft += firstCardWidthTech),
    2000
  );
};
autoPlayTech();

carousel_tech.addEventListener("mousedown", dragStarTech);
carousel_tech.addEventListener("mousemove", draggingTech);
document.addEventListener("mouseup", dragStopTech);
carousel_tech.addEventListener("scroll", infiniteScrollTech);
skill_details_tech.addEventListener("mouseenter", () =>
  clearTimeout(timeoutIdTech)
);
skill_details_tech.addEventListener("mouseleave", autoPlayTech);

// skills section carousel_prof ///////////////

const skill_details_prof = document.querySelector(".skill_details_prof");
const carousel_prof = document.querySelector(".carousel_prof");
const firstCardWidthprof =
  carousel_prof.querySelector(".card_prof").offsetWidth;
const arrowBtnsprof = document.querySelectorAll(".skill_details_prof i");
const carouselChildrensprof = [...carousel_prof.children];

let isdraggingprof = false,
  isautoPlayprof = true,
  startXprof,
  startScrollLeftprof,
  timeoutIdprof;

// Get the number of cards that can fit in the carousel_prof at once
let cardPerViewprof = Math.round(
  carousel_prof.offsetWidth / firstCardWidthprof
);

// Insert copies of the last few cards to beginning of carousel_prof for infinite scrolling
carouselChildrensprof
  .slice(-cardPerViewprof)
  .reverse()
  .forEach((card_prof) => {
    carousel_prof.insertAdjacentHTML("afterbegin", card_prof.outerHTML);
  });

// Insert copies of the first few cards to end of carousel_prof for infinite scrolling
carouselChildrensprof.slice(0, cardPerViewprof).forEach((card_prof) => {
  carousel_prof.insertAdjacentHTML("beforeend", card_prof.outerHTML);
});

// Scroll the carousel_prof at appropriate postition to hide first few duplicate cards on Firefox
carousel_prof.classList.add("no-transition");
carousel_prof.scrollLeft = carousel_prof.offsetWidth;
carousel_prof.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel_prof left and right
arrowBtnsprof.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel_prof.scrollLeft +=
      btn.id == "left" ? -firstCardWidthprof : firstCardWidthprof;
  });
});

const dragStarprof = (e) => {
  isdraggingprof = true;
  carousel_prof.classList.add("draggingprof");
  // Records the initial cursor and scroll position of the carousel_prof
  startXprof = e.pageX;
  startScrollLeftprof = carousel_prof.scrollLeft;
};

const draggingprof = (e) => {
  if (!isdraggingprof) return; // if isdraggingprof is false return from here
  // Updates the scroll position of the carousel_prof based on the cursor movement
  carousel_prof.scrollLeft = startScrollLeftprof - (e.pageX - startXprof);
};

const dragStopprof = () => {
  isdraggingprof = false;
  carousel_prof.classList.remove("draggingprof");
};

const infiniteScrollprof = () => {
  // If the carousel_prof is at the beginning, scroll to the end
  if (carousel_prof.scrollLeft === 0) {
    carousel_prof.classList.add("no-transition");
    carousel_prof.scrollLeft =
      carousel_prof.scrollWidth - 2 * carousel_prof.offsetWidth;
    carousel_prof.classList.remove("no-transition");
  }
  // If the carousel_prof is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel_prof.scrollLeft) ===
    carousel_prof.scrollWidth - carousel_prof.offsetWidth
  ) {
    carousel_prof.classList.add("no-transition");
    carousel_prof.scrollLeft = carousel_prof.offsetWidth;
    carousel_prof.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoPlayprof if mouse is not hovering over carousel_prof
  clearTimeout(timeoutIdprof);
  if (!skill_details_prof.matches(":hover")) autoPlayprof();
};

const autoPlayprof = () => {
  // autoPlayprof the carousel_prof after every 2000 ms
  timeoutIdprof = setTimeout(
    () => (carousel_prof.scrollLeft += firstCardWidthprof),
    2000
  );
};
autoPlayprof();

carousel_prof.addEventListener("mousedown", dragStarprof);
carousel_prof.addEventListener("mousemove", draggingprof);
document.addEventListener("mouseup", dragStopprof);
carousel_prof.addEventListener("scroll", infiniteScrollprof);
skill_details_prof.addEventListener("mouseenter", () =>
  clearTimeout(timeoutIdprof)
);
skill_details_prof.addEventListener("mouseleave", autoPlayprof);
