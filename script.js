/* =====================================================
   PORTFOLIO — script.js
   Adrian Kyle Condeza
   ===================================================== */

/* ---- 1. Loading Screen ---- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
    triggerVisible();
  }, 1000);
});

/* ---- 2. Dark Mode ---- */
const darkToggle = document.getElementById("dark-toggle");
const toggleIcon = document.getElementById("toggle-icon");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (toggleIcon) toggleIcon.textContent = "☀️";
}

if (darkToggle && toggleIcon) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleIcon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ---- 3. Custom Cursor ---- */
const cursor = document.getElementById("cursor");
const trail = document.getElementById("cursor-trail");
let trailX = 0,
  trailY = 0,
  mouseX = 0,
  mouseY = 0;

if (cursor && trail) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  (function animateTrail() {
    trailX += (mouseX - trailX) * 0.13;
    trailY += (mouseY - trailY) * 0.13;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
    requestAnimationFrame(animateTrail);
  })();

  document
    .querySelectorAll(
      "a, button, .skill-pill, .contact-card, .form-input, .avatar-glass",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover"),
      );
    });
}

/* ---- 4. Navbar scroll + active section ---- */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateNav() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 10);
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

/* ---- 5. Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
    closeMobileMenu();
  });
});

/* ---- 6. Mobile Menu ---- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  hamburger?.classList.remove("open");
  mobileMenu?.classList.remove("open");
}

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

/* ---- 7. Scroll Fade-In ---- */
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
);

function triggerVisible() {
  fadeEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
    } else {
      observer.observe(el);
    }
  });
}

/* ---- 8. Footer Year ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- 9. Contact Form ---- */
const sendBtn = document.querySelector(".btn-full");
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".form-input");
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = "rgba(255, 59, 48, 0.5)";
        input.style.boxShadow = "0 0 0 3px rgba(255, 59, 48, 0.08)";
        setTimeout(() => {
          input.style.borderColor = "";
          input.style.boxShadow = "";
        }, 1800);
      }
    });
    if (allFilled) {
      sendBtn.textContent = "✓ Message Sent!";
      sendBtn.style.background = "#34c759";
      sendBtn.style.boxShadow = "0 4px 18px rgba(52,199,89,0.35)";
      inputs.forEach((i) => (i.value = ""));
      setTimeout(() => {
        sendBtn.textContent = "Send Message";
        sendBtn.style.background = "";
        sendBtn.style.boxShadow = "";
      }, 3000);
    }
  });
}
