/* ═══════════════════════════════════════
   PARTICLE SYSTEM (background petals)
═══════════════════════════════════════ */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W,
  H,
  particles = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : -20;
    this.size = Math.random() * 6 + 2;
    this.speedY = Math.random() * 0.55 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.alpha = Math.random() * 0.45 + 0.15;
    this.type = Math.random() > 0.5 ? "petal" : "sparkle";
    this.color = Math.random() > 0.5 ? "#e8b4b8" : "#c9a96e";
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
    this.rotation += this.rotSpeed;
    if (this.y > H + 20) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.type === "petal") {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 1.7, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#c9a96e";
      ctx.font = `${this.size + 4}px serif`;
      ctx.fillText("✦", -this.size / 2, this.size / 2);
    }
    ctx.restore();
  }
}

// Spawn particles
for (let i = 0; i < 50; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ═══════════════════════════════════════
   ENVELOPE OPEN SEQUENCE
═══════════════════════════════════════ */
const envelopeWrap = document.getElementById("envelopeWrap");
const envelope = document.getElementById("envelope");
const envFlap = document.getElementById("envFlap");
const seal = document.getElementById("seal");
const hint = document.getElementById("hint");
const letterContainer = document.getElementById("letterContainer");
const letterHeading = document.getElementById("letterHeading");
const paragraphs = ["p1", "p2", "p3", "p4", "p5"];

let opened = false;

envelopeWrap.addEventListener("click", openEnvelope);

function openEnvelope() {
  if (opened) return;
  opened = true;

  // Remove hover effect while animating
  envelopeWrap.style.pointerEvents = "none";

  // Hide hint
  hint.classList.add("hidden");

  // ── STEP 1: Shake the envelope ──
  envelope.classList.add("shaking");

  // ── STEP 2: Break seal during shake ──
  setTimeout(() => {
    seal.classList.add("broken");
  }, 200);

  // ── STEP 3: Open flap after shake ends ──
  setTimeout(() => {
    envelope.classList.remove("shaking");
    envFlap.classList.add("open");
  }, 600);

  // ── STEP 4: Letter pops/rises out ──
  setTimeout(() => {
    letterContainer.classList.add("rising");
  }, 1050);

  // ── STEP 5: Envelope fades away ──
  setTimeout(() => {
    envelope.classList.add("disappear");
    // Remove envelope from layout after fade, then settle letter into flow
    setTimeout(() => {
      envelopeWrap.style.display = "none";
      // Detach letter from absolute positioning so it sits naturally on page
      letterContainer.classList.add("settled");
    }, 650);
  }, 1500);

  // ── STEP 6: Reveal letter text line by line ──
  const textDelays = [1800, 2050, 2500, 2950, 3400, 3850];
  const textEls = [
    letterHeading,
    ...paragraphs.map((id) => document.getElementById(id)),
  ];

  textEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, textDelays[i]);
  });

  // ── STEP 7: Burst hearts ──
  setTimeout(burstHearts, 1300);
}

/* ═══════════════════════════════════════
   FLOATING HEARTS BURST
═══════════════════════════════════════ */
function burstHearts() {
  const heartOptions = ["❤️", "🌸", "💕", "✨", "🌷", "💗", "🩷"];

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "floating-heart";
      el.textContent =
        heartOptions[Math.floor(Math.random() * heartOptions.length)];

      el.style.left = 8 + Math.random() * 84 + "vw";
      el.style.top = 55 + Math.random() * 35 + "vh";
      el.style.fontSize = 12 + Math.random() * 18 + "px";
      el.style.animationDuration = 3 + Math.random() * 4 + "s";

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 7500);
    }, i * 100);
  }
}
