@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Alex+Brush&family=Great+Vibes&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", serif;
  --font-signature: "Great Vibes", cursive;
  --font-signature-a: "Alex Brush", cursive;

  --color-bronze: #CD7F32;
  --color-gold: #D4AF37;
  --color-ink: #0A0D14;
  --color-midnight: #0B1222;
  --color-paper: #F5F2ED;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply antialiased selection:bg-gold/30 selection:text-white relative overflow-x-hidden;
  }

  @media (hover: hover) and (pointer: fine) {
    body {
      cursor: none;
    }
    a, button, [role="button"] {
      cursor: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight;
  }
}

/* Global Cinematic Overlay (Vignette & Grain) */
/* Removed to improve text visibility */

/* Subtle Grain Texture */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.page-hero {
  @apply pt-48 pb-32 md:pt-56 md:pb-40 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center;
  min-height: 70vh;
}

@media (max-width: 768px) {
  .page-hero {
    @apply pt-40 pb-24;
    min-height: 60vh;
  }
}

.cinematic-gradient {
  background: radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.1) 0%, transparent 70%);
}

.glass-panel {
  @apply bg-white/5 backdrop-blur-md border border-white/10;
}

/* Page-Specific Color Accents */
.press-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 60% 20%,
    rgba(50, 70, 110, 0.18),
    transparent 70%
  );
  pointer-events: none;
}

.legacy-timeline::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 20% 50%,
    rgba(90, 70, 40, 0.12),
    transparent 70%
  );
  pointer-events: none;
}

.services-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 80%,
    rgba(40, 80, 90, 0.15),
    transparent 70%
  );
  pointer-events: none;
}

/* Global Spacing */
section {
  @apply py-24 md:py-32;
}

.pb-48 {
  @apply pb-32 md:pb-48;
}

.mb-48 {
  @apply mb-32 md:mb-48;
}
.home-hero {
  position: relative;
  background: transparent;
}

.music-section {
  background: transparent;
}

.album-hero {
  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(40, 55, 80, 0.18),
      transparent 70%
    );
}

.collab-item:hover .collab-hover {
  background: rgba(214, 180, 122, 0.18);
}

h1, h2, h3 {
  letter-spacing: 0.5px;
}

p {
  line-height: 1.7;
}

.gold {
  color: #d6b47a;
}

img {
  border-radius: 6px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

@media (max-width: 900px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-3, .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-ink); 
}

::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-gold); 
}

/* Global Midnight Blue Theme */
html, body {
  @apply text-white;
  background: 
    radial-gradient(circle at 70% 30%, rgba(30, 64, 175, 0.22), transparent 70%),
    radial-gradient(circle at 30% 70%, rgba(15, 23, 42, 0.4), transparent 70%),
    var(--color-midnight);
  min-height: 100vh;
}

@media print {
  header, footer, .no-print {
    display: none !important;
  }
  
  body {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
  }

  /* Reset text colors for print */
  .text-paper, .text-white, .text-gold, .text-paper\/60, .text-paper\/80 {
    color: black !important;
  }
  
  /* Hide decorative elements */
  .absolute, .pointer-events-none {
    display: none !important;
  }

  /* Ensure content is visible */
  .relative, .z-10 {
    position: static !important;
  }

  /* Page breaks */
  h2, h3 {
    page-break-after: avoid;
  }
  
  section {
    padding: 20px 0 !important;
    page-break-inside: avoid;
  }
}
