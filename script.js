/* LETTER CONTAINER */
.letter-container {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: min(760px, 92vw);           /* slightly wider base */
  max-width: 780px;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition:
    top 0.95s cubic-bezier(0.34, 1.48, 0.64, 1.2),
    opacity 0.55s ease;
}

.letter-container.rising {
  top: -580px;                       /* tuned rise distance – adjust if needed */
  opacity: 1;
  pointer-events: auto;
}

.letter-container.settled {
  position: relative;
  top: auto;
  left: auto;
  transform: none;
  opacity: 1;
  pointer-events: auto;
  transition: none;
}

/* LETTER PAPER — aim for ~1.45:1 ratio landscape */
.letter-paper {
  background: linear-gradient(180deg, #fffdf8 0%, #fdf8f0 100%);
  border-radius: 5px;
  aspect-ratio: 1.44 / 1;            /* ← most important change – real letter feeling */
  width: 100%;
  min-height: 380px;                 /* fallback if aspect-ratio not supported */
  max-height: 94vh;                  /* prevent insane height on small screens */
  box-shadow:
    0 12px 48px rgba(0,0,0,0.11),
    0 3px 8px rgba(0,0,0,0.07),
    inset 0 0 0 1px rgba(201,169,110,0.18);
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 160px 1fr;  /* left panel still narrow */
}

/* Mobile – collapse to portrait/stacked */
@media (max-width: 640px) {          /* slightly higher breakpoint feels better */
  .letter-container {
    width: min(94vw, 420px);
  }

  .letter-paper {
    aspect-ratio: auto;              /* disable forced landscape ratio */
    grid-template-columns: 1fr;
    min-height: auto;
    max-height: none;
  }

  .letter-container.rising {
    top: -720px;                     /* more rise needed because taller now */
  }

  .letter-right-panel {
    padding: 28px 24px 32px;
  }

  .letter-heading {
    font-size: 34px;
    margin-bottom: 20px;
  }

  .letter-body {
    font-size: 15.5px;
    line-height: 1.82;
  }
}    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
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
