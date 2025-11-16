// ===== Smooth Scroll Navigation =====
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Dynamic Navbar Highlight =====
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
});

// ===== Scroll Progress Bar =====
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.background = "#04bee8";
progressBar.style.width = "0%";
progressBar.style.zIndex = "9999";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// ===== Typewriter Effect on Hero Section =====
const heroText = document.querySelector(".hero p");
const heroWords = ["The Omede Clan", "Dr.Ogu Omede", "Virtous Omede", "Bezaleel Omede", "Investment Omede", "Ariel Omede", "Zion Omede", "Joseph Omede"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = heroWords[wordIndex];
  const displayed = currentWord.substring(0, charIndex);
  heroText.textContent = displayed;

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % heroWords.length;
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// ===== Family Card Animations =====
const members = document.querySelectorAll(".member");
members.forEach(member => {
  member.addEventListener("mouseenter", () => {
    member.style.transform = "scale(1.1)";
    member.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  });
  member.addEventListener("mouseleave", () => {
    member.style.transform = "scale(1)";
    member.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  });
});

// ===== Contact Form Handling =====
const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("response");

form.addEventListener("submit", e => {
  e.preventDefault();
  responseMsg.textContent = "Sending message...";
  responseMsg.style.color = "#555";

  setTimeout(() => {
    responseMsg.textContent = "✅ Message sent successfully! We'll reach out soon.";
    responseMsg.style.color = "#02605f";
    form.reset();
  }, 1500);
});

// ===== Enhanced Gallery Lightbox =====
const galleryImages = document.querySelectorAll(".gallery img");
let currentIndex = 0;
let overlay, bigImage;

function openLightbox(index) {
  overlay = document.createElement("div");
  overlay.classList.add("overlay");
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "3000",
  });

  bigImage = document.createElement("img");
  bigImage.src = galleryImages[index].src;
  bigImage.style.maxWidth = "90%";
  bigImage.style.maxHeight = "90%";
  bigImage.style.borderRadius = "12px";
  bigImage.style.boxShadow = "0 0 20px rgba(255,255,255,0.4)";
  overlay.appendChild(bigImage);

  document.body.appendChild(overlay);

  overlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", handleLightboxKeys);
}

function closeLightbox() {
  if (overlay) {
    document.body.removeChild(overlay);
    document.removeEventListener("keydown", handleLightboxKeys);
  }
}

function handleLightboxKeys(e) {
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    bigImage.src = galleryImages[currentIndex].src;
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    bigImage.src = galleryImages[currentIndex].src;
  } else if (e.key === "Escape") {
    closeLightbox();
  }
}

galleryImages.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    openLightbox(i);
  });
});

// ===== Back to Top Button =====
const backToTop = document.createElement("button");
backToTop.textContent = "↑";
backToTop.style.position = "fixed";
backToTop.style.bottom = "30px";
backToTop.style.right = "30px";
backToTop.style.background = "#02605f";
backToTop.style.color = "white";
backToTop.style.border = "none";
backToTop.style.borderRadius = "50%";
backToTop.style.width = "45px";
backToTop.style.height = "45px";
backToTop.style.fontSize = "20px";
backToTop.style.cursor = "pointer";
backToTop.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
backToTop.style.display = "none";
backToTop.style.transition = "opacity 0.3s";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
    backToTop.style.opacity = "1";
  } else {
    backToTop.style.opacity = "0";
    setTimeout(() => (backToTop.style.display = "none"), 300);
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const responseElement = document.getElementById("response");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      responseElement.textContent = "✅ Message sent successfully!";
      form.reset();
    } else {
      responseElement.textContent = "❌ There was a problem sending your message.";
    }
  } catch (error) {
    responseElement.textContent = "⚠️ Network error. Please try again later.";
  }
});

