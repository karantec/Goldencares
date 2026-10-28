import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ============================ CONFIG ============================ */

// snappy "expo-out" curve + a crisp spring → everything feels swift
const ease = [0.16, 1, 0.3, 1];
const spring = { type: "spring", stiffness: 320, damping: 28, mass: 0.8 };

const INTRO = {
  eyebrow: "One connected platform, a lifetime of value",
  text: "Build lasting relationships and loyalty by helping people plan for and deal with life transitions.",
  hot: ["lasting", "relationships", "loyalty", "life", "transitions"],
};

const FEATURES = [
  {
    id: "estate",
    title: "Estate Planning",
    desc: "Guided, expert-built planning that helps people put a will and their wishes in place.",
    callout: {
      icon: "doc",
      head: "Guided step by step",
      sub: "Plain-language prompts, expert-built templates",
    },
    chips: [
      { t: "Will updated", s: "Just now", tone: "ok" },
      { t: "2 beneficiaries added", s: "Estate plan", tone: "info" },
    ],
  },
  {
    id: "caregiving",
    title: "Caregiving",
    desc: "Practical tools and support for the people caring for someone they love.",
    callout: {
      icon: "heart",
      head: "Care, organised",
      sub: "Checklists, contacts and reminders in one place",
    },
    chips: [
      { t: "Reminder · 3:00 pm", s: "Medication", tone: "info" },
      { t: "Care plan shared", s: "With family", tone: "ok" },
    ],
  },
  {
    id: "leave",
    title: "Leave Support",
    desc: "Clear guidance through every step of time away from work — before, during and after.",
    callout: {
      icon: "cal",
      head: "Know your options",
      sub: "Eligibility and next steps, explained simply",
    },
    chips: [
      { t: "Leave approved", s: "12 weeks", tone: "ok" },
      { t: "Return plan ready", s: "Review anytime", tone: "info" },
    ],
  },
  {
    id: "bereavement",
    title: "Bereavement Care",
    desc: "Compassionate help with both the practical and the emotional weight of loss.",
    callout: {
      icon: "heart",
      head: "One small step at a time",
      sub: "Gentle, manageable tasks — never overwhelming",
    },
    chips: [
      { t: "New step added", s: "Care plan", tone: "info" },
      { t: "Care Manager joined", s: "Here for you", tone: "ok" },
    ],
  },
  {
    id: "team",
    title: "Care Team",
    desc: "AI-assisted, human-led support for every question and every feeling.",
    callout: {
      icon: "users",
      head: "Real people, real care",
      sub: "A dedicated care manager is always a message away",
    },
    chips: [
      { t: "Alex is online", s: "Care Manager", tone: "ok" },
      { t: "Call booked · 10:00", s: "Tomorrow", tone: "info" },
    ],
  },
];

const PORTAL = {
  eyebrow: "Client Portal",
  title: "The client engagement portal for financial professionals",
  cta: "Learn more",
};

// Placeholder testimonial – replace with a real, approved quote
const QUOTE = {
  text: "This platform looks at the needs of each person as a whole, and creates a solution that’s unique to them.",
  hot: ["whole", "unique"],
  name: "Jordan Avery",
  role: "SVP, Group Benefits",
  company: "Company Name",
};

// Placeholder figures – replace with your real numbers
const STATS = [
  {
    to: 50,
    suffix: "M+",
    decimals: 0,
    label: "Individuals covered",
    ring: 0.85,
  },
  { to: 212, suffix: " hrs", decimals: 0, label: "Saved per user", ring: 0.7 },
  {
    to: 4.8,
    suffix: "/5",
    decimals: 1,
    label: "User satisfaction rating",
    ring: 0.96,
  },
];

/* ============================ HELPERS ============================ */

const shell = "mx-auto w-full max-w-[1552px] px-6 lg:px-10";

const AV_COLORS = [
  ["#ffb38a", "#ff8fb0"],
  ["#a5b4fc", "#7dd3fc"],
  ["#86efac", "#5eead4"],
  ["#fcd34d", "#fb923c"],
  ["#f0abfc", "#a78bfa"],
];

function Avatar({ name, size = 32, i = 0, dot = false, className = "" }) {
  const [a, b] = AV_COLORS[i % AV_COLORS.length];
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-neutral-900 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${a}, ${b})`,
      }}
    >
      {initials}
      {dot && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1e2427] bg-emerald-400" />
      )}
    </span>
  );
}

function AvatarStack({ names, size = 24, offset = 0 }) {
  return (
    <span className="flex items-center">
      {names.map((n, i) => (
        <Avatar
          key={n}
          name={n}
          size={size}
          i={i + offset}
          className="-ml-2 border-2 border-[#2a2a2a] first:ml-0"
        />
      ))}
    </span>
  );
}

function CountUp({ to, decimals = 0, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

/* ---- scroll-linked word reveal (words light up as you scroll) ---- */

function Word({ children, progress, range, hot }) {
  const color = useTransform(progress, range, [
    "rgba(255,255,255,0.16)",
    hot ? "#ffc29a" : "#ffffff",
  ]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <motion.span style={{ color, y }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

function WordsOnScroll({
  text,
  hot = [],
  className = "",
  from = "start 0.88",
  to = "end 0.5",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [from, to] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          hot={hot.includes(w.replace(/[^a-z]/gi, "").toLowerCase())}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ---- icons ---- */

const I = ({ children, className = "h-4 w-4", sw = 1.8 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);
const CarIcon = (p) => (
  <I {...p}>
    <path d="M5 17h14M3 13l2-6h14l2 6v4H3zM7 17v2M17 17v2" />
    <circle cx="7.5" cy="13.5" r=".6" />
    <circle cx="16.5" cy="13.5" r=".6" />
  </I>
);
const HomeIcon = (p) => (
  <I {...p}>
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 21V12h6v9" />
  </I>
);
const ChartIcon = (p) => (
  <I {...p}>
    <path d="M5 21V11M12 21V4M19 21v-7" />
  </I>
);
const CheckIcon = (p) => (
  <I {...p} sw={2.6}>
    <path d="m5 12 5 5L20 7" />
  </I>
);
const PhoneIcon = (p) => (
  <I {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </I>
);
const MenuIcon = (p) => (
  <I {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </I>
);
const GridIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={p.className || "h-5 w-5"}
  >
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);
const UsersIcon = (p) => (
  <I {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </I>
);
const SendIcon = (p) => (
  <I {...p}>
    <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />
  </I>
);
const BulbIcon = (p) => (
  <I {...p}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
  </I>
);
const HelpIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
  </I>
);
const PlusCircle = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
  </I>
);
const ArrowUp = (p) => (
  <I {...p} sw={2.4}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </I>
);
const Spark = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="6" cy="9.5" r="1.4" />
    <circle cx="16.5" cy="9" r="1.6" />
    <circle cx="9.5" cy="14.5" r="1.8" />
    <circle cx="15" cy="16" r="1.3" />
    <circle cx="5.5" cy="18" r="1" />
  </svg>
);

const CALLOUT_ICONS = {
  doc: HomeIcon,
  heart: (p) => (
    <I {...p}>
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </I>
  ),
  cal: (p) => (
    <I {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </I>
  ),
  users: UsersIcon,
};

/* ======================= BACKGROUND ARCS ======================== */

/**
 * FLICKER FIXES
 *  - every moving layer is promoted to its own GPU layer (willChange + translateZ)
 *  - parallax is passed through a spring so it glides instead of stepping
 *  - hairline beams get a tiny blur-free width bump + GPU layer so they don't shimmer
 */
function Arcs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });
  const y1 = useTransform(p, [0, 1], [0, -500]);
  const y2 = useTransform(p, [0, 1], [0, -1100]);
  const y3 = useTransform(p, [0, 1], [200, -700]);
  const rot = useTransform(p, [0, 1], [0, 35]);

  const gpu = { willChange: "transform", backfaceVisibility: "hidden" };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ y: y1, ...gpu }}
        className="absolute -left-[28%] top-[7%] aspect-square w-[62vw] transform-gpu rounded-full border border-white/[0.14]"
      />
      <motion.div
        style={{ y: y2, ...gpu }}
        className="absolute -right-[38%] top-[26%] aspect-square w-[88vw] transform-gpu rounded-full border border-white/[0.12]"
      />
      <motion.div
        style={{ y: y2, ...gpu }}
        className="absolute -right-[22%] top-[30%] aspect-square w-[60vw] transform-gpu rounded-full border border-white/[0.07]"
      />
      <motion.div
        style={{ y: y3, ...gpu }}
        className="absolute -left-[16%] top-[58%] aspect-square w-[54vw] transform-gpu rounded-full border border-white/[0.12]"
      />
      <motion.div
        style={{ y: y1, ...gpu }}
        className="absolute -right-[20%] top-[78%] aspect-square w-[70vw] transform-gpu rounded-full border border-white/[0.1]"
      />
      {/* diagonal light beams */}
      <motion.div
        style={{ rotate: rot, ...gpu }}
        className="absolute left-[52%] top-[18%] h-[130vh] w-[2px] transform-gpu bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
      <motion.div
        style={{ rotate: rot, ...gpu }}
        className="absolute left-[64%] top-[22%] h-[110vh] w-[2px] transform-gpu bg-gradient-to-b from-transparent via-white/10 to-transparent"
      />
      <motion.div
        style={{ rotate: rot, ...gpu }}
        className="absolute left-[30%] top-[62%] h-[120vh] w-[2px] transform-gpu bg-gradient-to-b from-transparent via-white/[0.14] to-transparent"
      />
    </div>
  );
}

/* ========================== 1. INTRO ============================ */

function Intro() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center py-32">
      <div className="mx-auto max-w-[780px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[14px] font-medium text-white/90 backdrop-blur"
        >
          <motion.span
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#ffb38a]"
          />
          {INTRO.eyebrow}
        </motion.p>

        <WordsOnScroll
          text={INTRO.text}
          hot={INTRO.hot}
          className="text-[24px] font-medium leading-[1.2] tracking-tight sm:text-[32px] lg:text-[40px]"
        />
      </div>
    </section>
  );
}

/* ====================== PHONE (realistic) ======================= */

/**
 * Device frame – titanium rim, black bezel, dynamic island, side buttons,
 * home indicator. Radii use % so it scales to any size.
 */
function PhoneShell({ children, className = "", status = true }) {
  return (
    <div
      className={`relative aspect-[9/19] rounded-[15%/7%] bg-gradient-to-b from-[#a2a2a8] via-[#3a3a3f] to-[#a8a8ae] p-[3px] shadow-[0_60px_120px_-25px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[16%] h-[4.5%] w-[3px] rounded-l bg-[#5a5a60]" />
      <span className="absolute -left-[3px] top-[23%] h-[8%] w-[3px] rounded-l bg-[#5a5a60]" />
      <span className="absolute -left-[3px] top-[33%] h-[8%] w-[3px] rounded-l bg-[#5a5a60]" />
      <span className="absolute -right-[3px] top-[27%] h-[12%] w-[3px] rounded-r bg-[#5a5a60]" />

      <div className="relative h-full w-full rounded-[14%/6.6%] bg-black p-[2.4%]">
        <div className="relative h-full w-full overflow-hidden rounded-[11.8%/5.5%] bg-gradient-to-b from-[#2c2c2f] to-[#19191b]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-[1.5%] z-30 flex h-[3.3%] w-[30%] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[3.5%]">
            <span className="aspect-square h-[42%] rounded-full bg-[#12122a] ring-1 ring-[#2b2b58]" />
          </div>

          {/* status bar */}
          {status && (
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[9%] pt-[4.2%] text-[11.5px] font-semibold text-white">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                {/* signal */}
                <svg
                  viewBox="0 0 18 12"
                  className="h-2.5 w-3.5"
                  fill="currentColor"
                >
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                {/* wifi */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                >
                  <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" />
                  <circle cx="12" cy="19.5" r="1" fill="currentColor" />
                </svg>
                {/* battery */}
                <span className="relative h-2.5 w-[22px] rounded-[4px] border border-white/60 p-[1.5px]">
                  <span className="block h-full w-[78%] rounded-[2px] bg-white" />
                  <span className="absolute -right-[3px] top-1/2 h-1 w-[2px] -translate-y-1/2 rounded-r bg-white/60" />
                </span>
              </span>
            </div>
          )}

          {children}

          {/* home indicator */}
          <div className="absolute bottom-[1.3%] left-1/2 z-30 h-[3px] w-[34%] -translate-x-1/2 rounded-full bg-white/75" />
        </div>
      </div>
    </div>
  );
}

/* ----- chat primitives (swift stagger) ----- */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { ...spring } },
};

/**
 * Chat is ABSOLUTELY positioned so the outgoing and incoming screens overlap
 * and cross-fade. No empty frame between them = no flash when switching.
 */
function Chat({ children }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        y: -8,
        transition: { duration: 0.16, ease: "easeIn" },
      }}
      style={{ willChange: "transform, opacity" }}
      className="absolute inset-x-0 top-0 flex flex-col gap-2.5 px-4 pt-1"
    >
      {children}
    </motion.div>
  );
}
const Time = ({ children }) => (
  <motion.p
    variants={item}
    className="py-1 text-center text-[11px] font-semibold text-white/50"
  >
    {children}
  </motion.p>
);
const User = ({ children }) => (
  <motion.div
    variants={item}
    className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-black/45 px-3.5 py-2.5 text-[13px] font-medium leading-snug text-white"
  >
    {children}
  </motion.div>
);
const Ai = ({ children }) => (
  <motion.div
    variants={item}
    className="max-w-[90%] rounded-2xl rounded-bl-md bg-white/[0.09] px-3.5 py-2.5 text-[13px] font-medium leading-snug text-white"
  >
    {children}
  </motion.div>
);
const Card = ({ children }) => (
  <motion.div variants={item} className="rounded-2xl bg-white/[0.09] p-3.5">
    {children}
  </motion.div>
);
const Sender = ({ children, avatar }) => (
  <motion.div
    variants={item}
    className="flex items-center gap-2 px-1 text-[11.5px] font-medium text-white/60"
  >
    {avatar || <Spark className="h-4 w-4 text-white" />}
    {children}
  </motion.div>
);

function EstateChat() {
  const gifts = [
    ["Family car", CarIcon, ["Anna Cole", "Ben Ortiz"]],
    ["Primary home", HomeIcon, ["Anna Cole"]],
    ["Stocks portfolio", ChartIcon, ["Ben Ortiz", "Carla Wu"]],
  ];
  const split = [
    { n: "Anna", p: 50, c: "#f1efe0" },
    { n: "Ben", p: 25, c: "#8e9db8" },
    { n: "Carla", p: 25, c: "#a39a3a" },
  ];
  return (
    <Chat>
      <Time>Today 7:15 pm</Time>
      <User>Can you remind me how I split my estate in my will?</User>
      <Ai>
        Here’s how you’ve currently divided your estate, including specific
        gifts and everything else.
      </Ai>
      <Card>
        <p className="text-[11px] font-semibold text-white/60">
          Disposition of gifts
        </p>
        <ul className="mt-2.5 space-y-2.5">
          {gifts.map(([label, Ic, names]) => (
            <li
              key={label}
              className="flex items-center justify-between text-[13px] font-medium"
            >
              <span className="flex items-center gap-2.5">
                <Ic className="h-[17px] w-[17px]" />
                {label}
              </span>
              <AvatarStack names={names} size={22} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] font-semibold text-white/60">
          Disposition of Residuary Estate
        </p>
        <div className="mt-2 flex h-2.5 overflow-hidden rounded-[3px]">
          {split.map((s, i) => (
            <motion.span
              key={s.n}
              initial={{ width: 0 }}
              animate={{ width: `${s.p}%` }}
              transition={{ duration: 0.7, ease, delay: 0.7 + i * 0.1 }}
              style={{ background: s.c }}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-3.5 text-[10.5px] font-medium text-white/80">
          {split.map((s) => (
            <span key={s.n} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: s.c }}
              />
              {s.n} {s.p}%
            </span>
          ))}
        </div>
      </Card>
      <Sender>AI Assistant</Sender>
    </Chat>
  );
}

function CaregivingChat() {
  const tasks = [
    ["Medication schedule", true],
    ["Home care visits", true],
    ["Insurance paperwork", false],
    ["Share updates with family", false],
  ];
  return (
    <Chat>
      <Time>Today 9:40 am</Time>
      <User>
        My mom just had surgery. I’m not sure where to begin with her care.
      </User>
      <Ai>
        I’m sorry she’s going through this. Let’s start with what matters most
        this week.
      </Ai>
      <Card>
        <p className="text-[11px] font-semibold text-white/60">
          This week’s care checklist
        </p>
        <ul className="mt-2.5 space-y-2.5">
          {tasks.map(([t, done], i) => (
            <li
              key={t}
              className="flex items-center gap-3 text-[13px] font-medium"
            >
              <motion.span
                initial={{
                  scale: 0.5,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                animate={{
                  scale: 1,
                  backgroundColor: done ? "#34d399" : "rgba(255,255,255,0.1)",
                }}
                transition={{
                  delay: 0.65 + i * 0.12,
                  type: "spring",
                  stiffness: 380,
                  damping: 18,
                }}
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-neutral-900"
              >
                {done && <CheckIcon className="h-2.5 w-2.5" />}
              </motion.span>
              <span className={done ? "text-white/55 line-through" : ""}>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Sender>Care Assistant</Sender>
    </Chat>
  );
}

function LeaveChat() {
  const bars = [
    ["Paid family leave", "12 weeks", 80, "#ffb38a"],
    ["Short-term disability", "6 weeks", 45, "#a5b4fc"],
    ["Personal days", "4 days", 25, "#86efac"],
  ];
  return (
    <Chat>
      <Time>Today 2:05 pm</Time>
      <User>
        I need time off to care for a family member. What are my options?
      </User>
      <Ai>Based on your plan, here’s what you’re eligible for.</Ai>
      <Card>
        <p className="text-[11px] font-semibold text-white/60">
          Your leave options
        </p>
        <ul className="mt-2.5 space-y-3">
          {bars.map(([l, v, p, c], i) => (
            <li key={l}>
              <div className="flex justify-between text-[12.5px] font-medium">
                <span>{l}</span>
                <span className="text-white/55">{v}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.75, ease, delay: 0.65 + i * 0.1 }}
                  className="block h-full rounded-full"
                  style={{ background: c }}
                />
              </div>
            </li>
          ))}
        </ul>
        <motion.span
          whileHover={{ scale: 1.06 }}
          className="mt-3.5 inline-block rounded-full bg-white/15 px-3 py-1.5 text-[11.5px] font-medium"
        >
          Request leave
        </motion.span>
      </Card>
      <Sender>Leave Assistant</Sender>
    </Chat>
  );
}

function BereavementChat() {
  return (
    <Chat>
      <Time>Today 8:20 pm</Time>
      <User>
        I know there are things I need to do, but I’m having a hard time getting
        started.
      </User>
      <Ai>
        That’s completely normal. Let me help you take this one small step at a
        time.
      </Ai>
      <Card>
        <p className="text-[13px] font-medium leading-snug">
          I’ve added a few manageable next steps for you.
        </p>
        <div className="mt-3.5 flex items-center gap-2">
          <motion.span
            whileHover={{ scale: 1.06 }}
            className="rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-medium"
          >
            View Care Plan
          </motion.span>
          <span className="flex items-center gap-1.5 px-1.5 text-[12px] font-medium">
            <PhoneIcon className="h-3.5 w-3.5" /> Schedule a call
          </span>
        </div>
      </Card>
      <Sender avatar={<Avatar name="Alex Rivera" size={26} i={0} dot />}>
        Alex, Care Manager
      </Sender>
    </Chat>
  );
}

function TeamChat() {
  return (
    <Chat>
      <Time>Today 6:30 pm</Time>
      <Ai>
        Hi, I’m Alex, your Care Manager. I’m here for every question — and every
        feeling.
      </Ai>
      <User>Thank you. Can we talk tomorrow?</User>
      <Ai>Of course. I’ve booked a time that works for you.</Ai>
      <Card>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-white/10 text-center leading-none">
            <span className="text-[8.5px] font-semibold uppercase text-[#ffb38a]">
              Tomorrow
            </span>
            <span className="mt-0.5 text-[14px] font-semibold">10:00</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold">Video call with Alex</p>
            <p className="text-[11.5px] text-white/55">
              30 min · Care check-in
            </p>
          </div>
        </div>
        <motion.span
          whileHover={{ scale: 1.06 }}
          className="mt-3.5 inline-block rounded-full bg-white/15 px-3 py-1.5 text-[11.5px] font-medium"
        >
          Add to calendar
        </motion.span>
      </Card>
      <Sender avatar={<Avatar name="Alex Rivera" size={26} i={0} dot />}>
        Alex, Care Manager
      </Sender>
    </Chat>
  );
}

const CHATS = [
  EstateChat,
  CaregivingChat,
  LeaveChat,
  BereavementChat,
  TeamChat,
];

/* ----- floating notification chips around the phone ----- */

function Chip({ chip, className, delay = 0, from = -30 }) {
  const dot = chip.tone === "ok" ? "bg-emerald-400" : "bg-[#a5b4fc]";
  return (
    <motion.div
      initial={{ opacity: 0, x: from, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: from / 2, transition: { duration: 0.15 } }}
      transition={{ ...spring, delay }}
      className={`pointer-events-none absolute z-30 hidden 2xl:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, from < 0 ? -9 : 9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1d2123]/95 py-2.5 pl-3 pr-5 shadow-2xl"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className="text-left">
          <span className="block text-[13px] font-semibold text-white">
            {chip.t}
          </span>
          <span className="block text-[11px] text-white/50">{chip.s}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ----- main phone with 3D tilt + glare ----- */

function Phone({ active }) {
  const Content = CHATS[active];
  const f = FEATURES[active];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 160,
    damping: 18,
  });
  const glarePos = useTransform(mx, [-0.5, 0.5], [10, 90]);
  const glare = useMotionTemplate`linear-gradient(115deg, transparent ${glarePos}%, rgba(255,255,255,0.13) 50%, transparent 85%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative p-6 [perspective:1400px] lg:p-10"
    >
      {/*
        glow – FLICKER FIX: previously this animated `scale` on an element that was
        centred with Tailwind's translate classes. Framer writes an inline `transform`
        that overwrote the centring, so the glow jumped. Now it only animates opacity,
        uses a cheap radial-gradient instead of a huge blur, and sits on its own layer.
      */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,140,255,0.30), rgba(124,140,255,0) 100%)",
          willChange: "opacity",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {/* chips (2xl+) — one presence group, overlapping swap, no blank gap */}
      <AnimatePresence>
        <Chip
          key={f.id + "a"}
          chip={f.chips[0]}
          className="-left-24 top-[14%]"
          from={-34}
        />
        <Chip
          key={f.id + "b"}
          chip={f.chips[1]}
          className="-right-28 bottom-[20%]"
          from={34}
          delay={0.08}
        />
      </AnimatePresence>

      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="relative"
      >
        <PhoneShell className="h-[min(680px,74vh)]">
          {/* app header */}
          <div className="absolute inset-x-0 top-[9.5%] z-10 flex items-center justify-between px-[8%]">
            <MenuIcon className="h-5 w-5 text-white/90" />
            <span className="text-[12px] font-semibold text-white/70">
              Assistant
            </span>
            <Avatar name="Sam Patel" size={28} i={3} />
          </div>

          {/* chat area */}
          <div
            className="absolute inset-x-0 bottom-[13%] top-[15.5%] overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 88%, transparent)",
            }}
          >
            {/* sync mode + absolutely-positioned screens = smooth cross-fade */}
            <AnimatePresence initial={false}>
              <Content key={active} />
            </AnimatePresence>
          </div>

          {/* input bar */}
          <div className="absolute inset-x-[5.5%] bottom-[4%] z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-1.5 pl-4 pr-1.5">
            <span className="flex-1 text-[12px] text-white/45">
              Ask anything
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-0.5 inline-block h-3 w-px translate-y-[2px] bg-white/70"
              />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-900">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* glass glare */}
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 z-40"
          />
        </PhoneShell>
      </motion.div>
    </div>
  );
}

/* ================ 2. STICKY PHONE SHOWCASE ====================== */

function SegBar({ progress, i, n }) {
  const sx = useTransform(progress, (v) => Math.min(1, Math.max(0, v * n - i)));
  return (
    <div className="mt-4 h-[2px] w-full max-w-[310px] overflow-hidden rounded-full bg-white/15">
      <motion.div
        style={{ scaleX: sx }}
        className="h-full origin-left bg-white"
      />
    </div>
  );
}

function Features() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // While a click-triggered smooth scroll is running we ignore scroll-driven
  // updates, otherwise the phone flips through every screen in between.
  const lockRef = useRef(false);
  const lockTimer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 220, damping: 34 });
  const N = FEATURES.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (lockRef.current) return;
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive((p) => (p === i ? p : i));
  });

  const releaseLock = () => {
    lockRef.current = false;
    if (lockTimer.current) {
      clearInterval(lockTimer.current);
      lockTimer.current = null;
    }
    window.removeEventListener("wheel", releaseLock);
    window.removeEventListener("touchstart", releaseLock);
    window.removeEventListener("keydown", releaseLock);
  };

  useEffect(() => releaseLock, []); // cleanup on unmount

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;

    // 1) switch the phone immediately, exactly once
    setActive(i);

    // 2) lock scroll-sync, then glide the page to the middle of that segment
    releaseLock();
    lockRef.current = true;

    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    const target = top + ((i + 0.5) / N) * total;
    window.scrollTo({ top: target, behavior: "smooth" });

    // 3) unlock once we've arrived (or the scroll has stopped moving)
    let last = window.scrollY;
    let still = 0;
    let ticks = 0;
    lockTimer.current = setInterval(() => {
      const y = window.scrollY;
      ticks++;
      if (Math.abs(y - target) < 3) still += 2;
      else if (y === last) still++;
      else still = 0;
      last = y;
      if (still >= 4 || ticks > 40) releaseLock();
    }, 60);

    // if the user grabs the wheel / touch / keys, hand control back immediately
    window.addEventListener("wheel", releaseLock, { passive: true });
    window.addEventListener("touchstart", releaseLock, { passive: true });
    window.addEventListener("keydown", releaseLock);
  };

  const f = FEATURES[active];
  const CIcon = CALLOUT_ICONS[f.callout.icon];

  return (
    <section
      ref={ref}
      style={{ height: `${(N + 1) * 60}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div
          className={`${shell} grid items-center gap-4 pt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:pt-0`}
        >
          {/* mobile chips */}
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden [scrollbar-width:none]">
            {FEATURES.map((ft, i) => (
              <motion.button
                key={ft.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => goTo(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[14px] transition-colors ${
                  i === active
                    ? "border-white bg-white text-neutral-900"
                    : "border-white/20 text-white/70"
                }`}
              >
                {ft.title}
              </motion.button>
            ))}
          </div>

          {/* desktop list */}
          <div className="relative hidden pl-8 lg:block">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10">
              <motion.div
                style={{ scaleY: fill }}
                className="h-full origin-top bg-gradient-to-b from-[#ffb38a] via-[#ff8fb0] to-[#a78bfa]"
              />
            </div>

            <ul className="space-y-5">
              {FEATURES.map((ft, i) => {
                const on = i === active;
                return (
                  <li key={ft.id} className="relative">
                    {/* active marker – simple scale-in (layoutId jittered while the accordion resized) */}
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={spring}
                          className="absolute -left-[37px] top-[18px] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]"
                        />
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => goTo(i)}
                      className="group flex items-baseline gap-3 text-left"
                    >
                      <span
                        className={`text-[12px] font-medium transition-colors ${on ? "text-[#ffb38a]" : "text-white/25"}`}
                      >
                        0{i + 1}
                      </span>
                      <motion.span
                        animate={{
                          color: on ? "#ffffff" : "rgba(255,255,255,0.32)",
                        }}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.2 }}
                        className="block text-[22px] font-medium tracking-tight xl:text-[26px]"
                      >
                        {ft.title}
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden pl-[34px]"
                        >
                          <p className="mt-2 max-w-[300px] text-[14.5px] leading-snug text-white/80">
                            {ft.desc}
                          </p>
                          <a
                            href="#"
                            className="group/l mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-white"
                          >
                            Learn more
                            <span className="inline-block transition-transform group-hover/l:translate-x-1">
                              →
                            </span>
                          </a>
                          <SegBar progress={scrollYProgress} i={i} n={N} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* phone */}
          <div className="flex justify-center">
            <Phone active={active} />
          </div>

          {/* mobile description */}
          <div className="text-center lg:hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={f.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-auto max-w-[320px] text-[15px] leading-snug text-white/75"
              >
                {f.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* right callout (desktop) */}
          <div className="hidden justify-end lg:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: 36, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 18, transition: { duration: 0.14 } }}
                transition={spring}
                className="w-[290px] rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffb38a] to-[#a78bfa] text-neutral-900">
                  <CIcon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[17px] font-semibold leading-tight">
                  {f.callout.head}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-white/60">
                  {f.callout.sub}
                </p>
                <div className="mt-6 flex items-center gap-1.5">
                  {FEATURES.map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        width: i === active ? 28 : 8,
                        backgroundColor:
                          i === active ? "#ffffff" : "rgba(255,255,255,0.2)",
                      }}
                      transition={spring}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== 3. PORTAL / DASHBOARD ==================== */

const ACTIVITY = [
  {
    name: "Daniel Brooks",
    text: "Added a new property. Share a guide to help him update his estate plan.",
    cta: "Share Guide",
  },
  {
    name: "Priya Nair",
    text: "Added a family member. A good moment to check in and review next steps.",
    cta: "Send Email",
  },
  {
    name: "Sofia Martins",
    text: "Completed her will. A good time to connect.",
    cta: "Schedule a call",
  },
  {
    name: "Marcus Reed",
    text: "Updated beneficiaries. Confirm the changes look right.",
    cta: "Review",
  },
];

/** small client-side phone that overlaps the dashboard */
function MiniPhone({ progress }) {
  const y = useTransform(progress, [0, 1], [140, -10]);
  const rotate = useTransform(progress, [0, 1], [10, 5]);
  const tasks = [
    ["Upload documents", true],
    ["Review your will", true],
    ["Add a beneficiary", false],
  ];
  return (
    <motion.div
      style={{ y, rotate, willChange: "transform" }}
      className="absolute -right-6 bottom-[-70px] z-30 hidden w-[210px] md:block xl:-right-24 xl:w-[230px]"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PhoneShell status={false}>
          <div className="absolute inset-0 px-[8%] pt-[14%] text-white">
            <p className="text-[9px] font-medium text-white/50">Your plan</p>
            <p className="mt-0.5 text-[13px] font-semibold">
              Good evening, Sam
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.08] p-3">
              <svg
                viewBox="0 0 64 64"
                className="h-14 w-14 shrink-0 -rotate-90"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#ffb38a"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 0.72 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease, delay: 0.3 }}
                />
              </svg>
              <div>
                <p className="text-[18px] font-semibold leading-none">72%</p>
                <p className="mt-1 text-[9.5px] text-white/55">
                  of your plan is complete
                </p>
              </div>
            </div>

            <ul className="mt-3 space-y-2">
              {tasks.map(([t, d], i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-2.5 py-2 text-[10.5px] font-medium"
                >
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                      d ? "bg-emerald-400 text-neutral-900" : "bg-white/15"
                    }`}
                  >
                    {d && <CheckIcon className="h-2 w-2" />}
                  </span>
                  <span className={d ? "text-white/55 line-through" : ""}>
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </PhoneShell>
      </motion.div>
    </motion.div>
  );
}

function Portal() {
  const ref = useRef(null);
  const [rail, setRail] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const barRef = useRef(null);
  const barIn = useInView(barRef, { once: true, amount: 0.8 });

  const railIcons = [GridIcon, UsersIcon, SendIcon, BulbIcon, HelpIcon];

  return (
    <section ref={ref} className="relative py-28">
      {/* teal atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#24444c]/60 to-transparent"
      />
      {/* opacity-only pulse on a cheap radial gradient (no giant blur filter) */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(62,138,143,0.28), rgba(62,138,143,0) 100%)",
          willChange: "opacity",
        }}
        className="pointer-events-none absolute left-1/2 top-[30%] h-[560px] w-[1000px] -translate-x-1/2 rounded-full"
      />

      <div className="relative mx-auto max-w-[900px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-[17px] text-white/60"
        >
          {PORTAL.eyebrow}
          <sup className="ml-0.5 text-[11px]">™</sup>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="mx-auto mt-4 max-w-[700px] text-[26px] font-medium leading-[1.15] tracking-tight sm:text-[34px] lg:text-[40px]"
        >
          {PORTAL.title}
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-neutral-900"
        >
          {PORTAL.cta}
        </motion.a>
      </div>

      {/* dashboard */}
      <div className="relative mx-auto mt-16 max-w-[904px] px-4 [perspective:1600px]">
        {/* floating toasts */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.4 }}
          className="absolute -left-10 top-24 z-20 hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b2326]/95 py-3 pl-3 pr-5 shadow-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-neutral-900">
              <CheckIcon className="h-4 w-4" />
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-semibold">
                Will completed
              </span>
              <span className="block text-[11.5px] text-white/55">
                Sofia M. · just now
              </span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            rotateX,
            scale,
            y,
            transformOrigin: "50% 0%",
            willChange: "transform",
          }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#26302f] to-[#1b2022] p-5 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] sm:p-8"
        >
          <div className="flex gap-6 sm:gap-10">
            {/* icon rail */}
            <div className="relative flex flex-col items-center gap-3 pt-1">
              {railIcons.map((Ic, i) => (
                <motion.button
                  key={i}
                  onClick={() => setRail(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Menu ${i + 1}`}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    rail === i
                      ? "text-white"
                      : "text-white/35 hover:text-white/70"
                  }`}
                >
                  {rail === i && (
                    <motion.span
                      layoutId="rail-bg"
                      transition={spring}
                      className="absolute inset-0 rounded-xl bg-white/10"
                    />
                  )}
                  <Ic className="relative h-5 w-5" />
                </motion.button>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-[22px]">Clients Overview</h3>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-[14px] font-medium"
                  >
                    <PlusCircle className="h-5 w-5" /> Invite client
                  </motion.button>
                  <Avatar name="Sam Patel" size={32} i={3} dot />
                </div>
              </div>

              <div ref={barRef} className="mt-8 flex items-end gap-5">
                <span className="text-[48px] font-light leading-none tracking-tight sm:text-[58px]">
                  <CountUp to={72} />%
                </span>
                <span className="pb-1">
                  <span className="block text-[17px] font-medium">
                    Active clients
                  </span>
                  <span className="block text-[12.5px] text-white/65">
                    Completed at least one estate planning document
                  </span>
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: barIn ? "72%" : 0 }}
                  transition={{ duration: 1.2, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-white to-[#ffd2b5]"
                />
              </div>

              <div className="mt-9 flex items-center justify-between">
                <h4 className="text-[17px] font-medium">
                  Recent activity &amp; Highlights
                </h4>
                <a
                  href="#"
                  className="text-[13px] font-semibold hover:underline"
                >
                  View all
                </a>
              </div>

              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  show: {
                    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
                  },
                }}
                className="mt-4 space-y-3"
              >
                {ACTIVITY.map((a, i) => (
                  <motion.li
                    key={a.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { ...spring } },
                    }}
                    whileHover={{
                      x: 4,
                      backgroundColor: "rgba(255,255,255,0.09)",
                    }}
                    className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4"
                  >
                    <Avatar name={a.name} size={40} i={i} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium">{a.name}</p>
                      <p className="mt-0.5 truncate text-[13px] text-white/70">
                        {a.text}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.94 }}
                      className="hidden shrink-0 rounded-full bg-white/90 px-4 py-1.5 text-[12.5px] font-medium text-neutral-900 sm:block"
                    >
                      {a.cta}
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1b2022] to-transparent" />
        </motion.div>

        <MiniPhone progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ======================== 4. TESTIMONIAL ======================== */

function Testimonial() {
  return (
    <section className="relative py-32 lg:py-44">
      <div className={shell}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-2 block font-serif text-[80px] leading-none text-[#ffb38a]"
        >
          “
        </motion.span>

        <WordsOnScroll
          text={QUOTE.text}
          hot={QUOTE.hot}
          from="start 0.85"
          to="end 0.55"
          className="max-w-[980px] font-serif text-[24px] leading-[1.25] sm:text-[32px] lg:text-[44px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Avatar name={QUOTE.name} size={48} i={0} />
          <p className="text-[16px]">
            <span className="font-semibold">{QUOTE.name}</span>{" "}
            <span className="text-white/75">{QUOTE.role}</span>
          </p>
          <span className="flex items-center gap-2 text-[20px] font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[13px] text-neutral-900">
              C
            </span>
            {QUOTE.company}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================ 5. STATS ========================== */

function Ring({ value }) {
  return (
    <div className="relative h-[170px] w-[170px]">
      {/* slow rotating dashed ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.5"
          strokeDasharray="1 3"
        />
      </motion.svg>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb38a" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      {/* centre dot: centred by a flex wrapper so framer's scale can't clobber it */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-[#ffb38a]"
        />
      </span>
    </div>
  );
}

function Stats() {
  return (
    <section className="relative pb-40 pt-10">
      <div className={shell}>
        {STATS.map((s, i) => (
          <div key={s.label} className="relative">
            {i > 0 && (
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
                className="absolute left-0 top-0 h-px w-full origin-left bg-white/35"
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease }}
              className="group flex items-center justify-between py-12 lg:py-16"
            >
              <div>
                <p className="text-[56px] font-light leading-none tracking-[-0.04em] sm:text-[80px] lg:text-[104px]">
                  <CountUp to={s.to} decimals={s.decimals} />
                  <span
                    className={
                      s.suffix.trim().startsWith("h")
                        ? "ml-2 text-[0.38em] tracking-tight"
                        : ""
                    }
                  >
                    {s.suffix}
                  </span>
                </p>
                <p className="mt-5 flex items-center gap-3 text-[17px] font-medium">
                  <span className="h-px w-0 bg-[#ffb38a] transition-all duration-300 group-hover:w-8" />
                  {s.label}
                </p>
              </div>

              <div className="hidden md:block">
                <Ring value={s.ring} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================ EXPORT ============================ */

export default function Sections() {
  return (
    // `overflow-x-clip` (not overflow-hidden) so position:sticky keeps working
    // inside the Features section while still hiding horizontal overflow.
    <div className="relative overflow-x-clip bg-[#121212] text-white">
      <Arcs />
      <div className="relative z-10">
        <Intro />
        <Features />
        <Portal />
        <Testimonial />
        <Stats />
      </div>
    </div>
  );
}

export { Intro, Features, Portal, Testimonial, Stats, PhoneShell };
