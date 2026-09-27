document.addEventListener("DOMContentLoaded", () => {
  console.log("script loaded");

// ========================
// AVATAR EYES FOLLOW MOUSE - DESKTOP ONLY
// ========================

const leftPupil = document.getElementById("pupil-left");
const rightPupil = document.getElementById("pupil-right");

if (leftPupil && rightPupil) {
  const isDesktop = window.matchMedia("(min-width: 769px)").matches;

  if (isDesktop) {
    document.addEventListener("mousemove", (event) => {
      const moveX = (event.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (event.clientY / window.innerHeight - 0.5) * 20;

      leftPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      rightPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  if (!isDesktop) {
    leftPupil.style.transform = "translate(0, 0)";
    rightPupil.style.transform = "translate(0, 0)";
  }
}

  // ========================
  // REVEAL ON SCROLL
  // ========================

  const revealSections = document.querySelectorAll(".reveal-section");

  function revealOnScroll() {
    revealSections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
        section.classList.add("is-visible");
      }
    });
  }

  // ========================
  // ABOUT TEXT CHANGE ON SCROLL
  // ========================

  const aboutSection = document.querySelector(".about-section");
  const aboutTexts = document.querySelectorAll(".about-text");

  function changeAboutTextOnScroll() {
    if (!aboutSection || aboutTexts.length === 0) return;

    const rect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const totalScrollable = rect.height - viewportHeight;

    let progress = -rect.top / totalScrollable;
    progress = Math.max(0, Math.min(progress, 1));

    const textIndex = Math.min(
      Math.floor(progress * aboutTexts.length),
      aboutTexts.length - 1
    );

    aboutTexts.forEach((text, index) => {
      text.classList.toggle("about-text-active", index === textIndex);
    });
  }

  // ========================
  // RUN ANIMATIONS
  // ========================

  function updateAnimations() {
    revealOnScroll();
    changeAboutTextOnScroll();
    requestAnimationFrame(updateAnimations);
  }

  updateAnimations();
	
// ========================
// BACK TO TOP BUTTON
// ========================

const backToTop = document.getElementById("backToTop");
	

if (backToTop) {
  backToTop.addEventListener("click", () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
	  
	  

    document.body.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
});

// ========================
// MOBILE BURGER MENU
// ========================

const burgerMenu = document.getElementById("burgerMenu");
const navLinks = document.getElementById("navLinks");

if (burgerMenu && navLinks) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-open");
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    });
  });
}

// ========================
// R36S IMAGE SEQUENCE MOUSE CONTROL
// ========================

const r36s = document.getElementById("r36s");

if (r36s) {

  const totalFrames = 60;
  const frames = [];

  let currentFrame = 1;


  // preload images
  for(let i = 1; i <= totalFrames; i++){

    const img = new Image();

    let number = String(i).padStart(4, "0");

    img.src = `./assets/projects/3d/models/R36S/R36S${number}.png`;

    frames.push(img);
  }


  document.addEventListener("mousemove", (e)=>{


    // mouse position 0-1
    const mouseX = e.clientX / window.innerWidth;


    // only use left/right movement
    const frame = Math.floor(mouseX * totalFrames);


    if(frame !== currentFrame && frames[frame]){

      currentFrame = frame;

      r36s.src = frames[frame].src;

    }


  });

}


// ========================
// Dagger IMAGE SEQUENCE MOUSE CONTROL
// ========================

const dagger = document.getElementById("dagger");

if (dagger) {

  const totalFrames = 60;
  const frames = [];

  let currentFrame = 1;


  // preload images
  for(let i = 1; i <= totalFrames; i++){

    const img = new Image();

    let number = String(i).padStart(4, "0");

    img.src = `./assets/projects/3d/models/Dagger/Knife${number}.png`;

    frames.push(img);
  }


  document.addEventListener("mousemove", (e)=>{


    // mouse position 0-1
    const mouseX = e.clientX / window.innerWidth;


    // only use left/right movement
    const frame = Math.floor(mouseX * totalFrames);


    if(frame !== currentFrame && frames[frame]){

      currentFrame = frame;

      dagger.src = frames[frame].src;

    }


  });

}