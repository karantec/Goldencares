import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ----------------------------- Config ----------------------------- */

const ease = [0.22, 1, 0.36, 1];

// Put a photo URL here (e.g. "/hero.jpg"). Leave "" to use the animated aurora.
const HERO_IMAGE = "";

// Each line is a list of segments. `grad: true` gets the animated gradient.
const HEADLINE = [
  [{ t: "AI + Human care for" }],
  [{ t: "life’s " }, { t: "hardest moments", grad: true }],
];

const SUBTEXT =
  "One connected platform for estate planning, bereavement, leave and caregiving — so no one has to navigate it alone.";

const PROMPTS = [
  "How do I support a grieving employee?",
  "What happens when a loved one passes away?",
  "Help me plan time off for caregiving…",
  "Where do I start with estate planning?",
];

const CHIPS = [
  "Support a grieving employee",
  "Plan time off",
  "Start estate planning",
  "Caregiver resources",
];

// Placeholder partner names – replace with your own <img src="logo.svg" /> list
const PARTNERS = [
  { name: "Northwind", style: "font-serif italic text-2xl" },
  { name: "BlueHarbor", style: "font-sans font-bold text-xl tracking-tight" },
  { name: "Summit&Co", style: "font-sans font-semibold text-xl" },
  { name: "Lumina", style: "font-serif text-2xl" },
  { name: "Orbital", style: "font-sans font-bold text-xl tracking-wide" },
  { name: "Evergreen", style: "font-serif italic text-2xl" },
  { name: "Atlas Group", style: "font-sans font-semibold text-xl" },
  { name: "Keystone", style: "font-sans font-bold text-xl tracking-tight" },
];

// deterministic particles (no hydration mismatch)
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  dur: 6 + (i % 5) * 2,
  delay: (i % 7) * 0.6,
}));

/* ------------------------- Typewriter hook ------------------------ */

function useTypewriter(phrases, { type = 55, erase = 25, hold = 1500 } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    let j = 0;
    let deleting = false;
    let t;

    const tick = () => {
      const full = phrases[i];
      if (!deleting) {
        j += 1;
        setText(full.slice(0, j));
        if (j === full.length) {
          deleting = true;
          t = setTimeout(tick, hold);
          return;
        }
        t = setTimeout(tick, type);
      } else {
        j -= 1;
        setText(full.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          t = setTimeout(tick, 400);
          return;
        }
        t = setTimeout(tick, erase);
      }
    };

    t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, [phrases, type, erase, hold]);

  return text;
}

/* ------------------------------ Icons ----------------------------- */

const SparkIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="6" cy="9.5" r="1.4" />
    <circle cx="16.5" cy="9" r="1.6" />
    <circle cx="9.5" cy="14.5" r="1.8" />
    <circle cx="15" cy="16" r="1.3" />
    <circle cx="5.5" cy="18" r="1" />
  </svg>
);

const MicIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

const ArrowUp = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* --------------------------- Background --------------------------- */

function Aurora() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0d0b12]">
      {/* photo (optional) */}
      {HERO_IMAGE && (
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* aurora blobs */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 120, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-[10%] top-[5%] h-[620px] w-[620px] rounded-full bg-[#ff8a5c]/40 mix-blend-screen blur-[140px]"
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, -140, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[8%] top-[0%] h-[680px] w-[680px] rounded-full bg-[#7c5cff]/45 mix-blend-screen blur-[150px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 80, -80, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[30%] h-[520px] w-[620px] rounded-full bg-[#ff4d8d]/25 mix-blend-screen blur-[140px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -60, 40, 0], y: [0, 40, -50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] right-[10%] h-[420px] w-[420px] rounded-full bg-[#38bdf8]/25 mix-blend-screen blur-[130px]"
      />

      {/* faded grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
        }}
      />

      {/* particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.05, 0.7, 0.05] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}

/* ------------------------- Floating glass cards ------------------- */

function FloatingCards({ sx, sy }) {
  const lx = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const ly = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const rx = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const ry = useTransform(sy, [-0.5, 0.5], [22, -22]);

  return (
    <>
      {/* left – care team online */}
      <motion.div
        style={{ x: lx, y: ly }}
        className="pointer-events-none absolute left-[3%] top-[34%] hidden 2xl:block"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[230px] rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-[12px] text-white/80">
              <motion.span
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              Care team online
            </div>
            <div className="mt-3 flex items-center">
              {["#ffb38a", "#c4a5ff", "#8fd3ff", "#ff9ec0"].map((c, i) => (
                <span
                  key={c}
                  className="-ml-2 h-9 w-9 rounded-full border-2 border-[#1a1520] first:ml-0"
                  style={{
                    background: `linear-gradient(135deg, ${c}, #ffffff55)`,
                    zIndex: 4 - i,
                  }}
                />
              ))}
              <span className="ml-3 text-[12px] text-white/70">
                +12 experts
              </span>
            </div>
            <p className="mt-3 text-[12.5px] leading-snug text-white/85">
              Real people, ready to help — any time of day.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* right – chat bubble */}
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none absolute right-[3%] top-[44%] hidden 2xl:block"
      >
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 1.6 }}
        >
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-[240px] rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-2xl backdrop-blur-xl"
          >
            <p className="text-[11px] uppercase tracking-widest text-white/50">
              Assistant
            </p>
            <p className="mt-2 rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-[12.5px] text-white/90">
              I’m so sorry for your loss. How can I help today?
            </p>
            <div className="mt-2 flex w-fit items-center gap-1 rounded-xl rounded-tr-sm bg-white/10 px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: d * 0.15,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-white"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ------------------------------ Chat box -------------------------- */

function ChatBox() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const typed = useTypewriter(PROMPTS);

  const submit = (e) => {
    e.preventDefault();
    // TODO: send `value` to your assistant / route to a demo form
    console.log("submit:", value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.95 }}
      className="mx-auto w-full max-w-[560px]"
    >
      {/* rotating gradient border */}
      <div className="relative overflow-hidden rounded-[28px] p-[1.5px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0 55%, #ffb38a 70%, #c084fc 85%, #60a5fa 95%, transparent 100%)",
          }}
        />

        <form
          onSubmit={submit}
          className="relative rounded-[26px] bg-[#100d14]/90 p-2.5 backdrop-blur-2xl"
        >
          <div className="flex h-[56px] items-center gap-3 rounded-[18px] bg-white/[0.05] px-4 transition-colors focus-within:bg-white/[0.09]">
            <motion.div
              animate={{ rotate: [0, 14, -14, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#ffb38a]"
            >
              <SparkIcon className="h-[18px] w-[18px]" />
            </motion.div>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Ask a question"
                className="w-full bg-transparent text-[14.5px] text-white outline-none"
              />
              {value === "" && (
                <span className="pointer-events-none absolute inset-0 flex items-center truncate text-left text-[14.5px] text-white/55">
                  {typed}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-0.5 inline-block h-4 w-px bg-white"
                  />
                </span>
              )}
            </div>

            <motion.button
              type="button"
              aria-label="Voice input"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="text-white/60 transition-colors hover:text-white"
            >
              <MicIcon className="h-[17px] w-[17px]" />
            </motion.button>

            <motion.button
              type="submit"
              aria-label="Send"
              whileHover={{ scale: 1.1, rotate: -8 }}
              whileTap={{ scale: 0.88 }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb38a] via-[#ff8fb0] to-[#a78bfa] text-white shadow-lg shadow-[#ff8fb0]/30"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>

          {/* suggestion chips */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 1.5 },
              },
            }}
            className="flex flex-wrap justify-center gap-2 px-1 pb-1 pt-3"
          >
            {CHIPS.map((c) => (
              <motion.button
                key={c}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease },
                  },
                }}
                whileHover={{
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.16)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setValue(c);
                  inputRef.current?.focus();
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/75 transition-colors hover:text-white"
              >
                {c}
              </motion.button>
            ))}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

/* ---------------------------- Marquee ----------------------------- */

function PartnerMarquee() {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
      className="absolute inset-x-0 bottom-0 pb-7 pt-6"
    >
      <p className="mb-5 text-center text-[10.5px] font-medium uppercase tracking-[0.25em] text-white/40">
        Trusted by teams at leading organizations
      </p>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-20 pr-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {items.map((p, i) => (
            <span
              key={i}
              className={`whitespace-nowrap text-white/60 transition-colors hover:text-white ${p.style}`}
            >
              {p.name}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------- Hero ----------------------------- */

export default function Hero() {
  const ref = useRef(null);

  // mouse position → spotlight + parallax
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 60, damping: 18 });
  const sy = useSpring(ny, { stiffness: 60, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(255,190,150,0.16), transparent 60%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    nx.set(px - 0.5);
    ny.set(py - 0.5);
  };

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-44 pt-36 text-center text-white"
    >
      <Aurora />
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{ background: spotlight }}
      />
      <FloatingCards sx={sx} sy={sy} />
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[900px]"
      >
        {/* badge */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ scale: 1.04 }}
          className="group mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pl-2 pr-4 text-[12.5px] text-white/90 backdrop-blur-xl"
        >
          <span className="rounded-full bg-gradient-to-r from-[#ffb38a] to-[#ff8fb0] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-900">
            New
          </span>
          AI-powered care navigation
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>

        {/* headline */}
        <h1 className="font-sans text-[32px] font-medium leading-[1.1] tracking-tight sm:text-[44px] md:text-[52px] lg:text-[60px]">
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "115%", rotate: 3, filter: "blur(10px)" }}
                animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.16 }}
              >
                {line.map((seg, k) =>
                  seg.grad ? (
                    <motion.span
                      key={k}
                      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="bg-gradient-to-r from-[#ffd9b8] via-[#ff9ec0] via-40% to-[#b9a6ff] bg-[length:200%_auto] bg-clip-text text-transparent"
                    >
                      {seg.t}
                    </motion.span>
                  ) : (
                    <span key={k}>{seg.t}</span>
                  ),
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="mx-auto mt-3 max-w-[560px] text-[14.5px] leading-relaxed text-white/70 sm:text-[16px]"
        >
          {SUBTEXT}
        </motion.p>

        {/* chat */}
        <div className="mt-9">
          <ChatBox />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 12px 44px rgba(255,255,255,0.28)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-neutral-900"
          >
            <motion.span
              aria-hidden
              className="absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-black/10 to-transparent"
              animate={{ left: ["-50%", "150%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
            />
            <span className="relative">Book a Demo</span>
            <span className="relative">→</span>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 pl-2 pr-5 text-[14px] font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/10"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-white/40"
              />
              <PlayIcon className="relative ml-0.5 h-3.5 w-3.5" />
            </span>
            Watch how it works
          </motion.a>
        </motion.div>
      </motion.div>
      <PartnerMarquee />
    </section>
  );
}
