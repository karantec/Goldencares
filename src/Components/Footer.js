import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
} from "framer-motion";

/* ----------------------------- Data ----------------------------- */

const BRAND = "goldencares"; // your brand name (used in the big wordmark + copyright)

const columns = [
  {
    title: "Platform",
    links: [
      "Platform Overview",
      "Estate Planning",
      "Bereavement Care",
      "Leave Support",
      "Caregiving Support",
      "Client Engagement",
    ],
  },
  {
    title: "Industries",
    links: ["Insurance", "Financial Services", "Employers"],
  },
  {
    title: "Resources",
    links: [
      "Research",
      "Events & Webinars",
      "Articles",
      "Customers",
      "Knowledge Base",
      "All resources",
    ],
  },
  {
    title: "About",
    links: [
      "About Us",
      "In the News",
      "Our Experts",
      "The Alliance",
      "Careers",
    ],
  },
];

const legalLinks = [
  "Privacy Policy",
  "Terms of service",
  "Cookie Policy",
  "Your Privacy Choices",
];

const marqueeWords = [
  "Estate Planning",
  "Bereavement Care",
  "Leave Support",
  "Caregiving Support",
  "Client Engagement",
];

/* ------------------------- Social icons ------------------------- */

const XIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z" />
  </svg>
);
const LinkedInIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z" />
  </svg>
);

const socials = [
  { label: "X", Icon: XIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
];

/* ------------------------ Animation presets --------------------- */

const ease = [0.22, 1, 0.36, 1];

const stagger = (s = 0.08, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/* ------------------------ Helper components --------------------- */

/** Reveals text word-by-word, each word sliding up from a mask. */
function WordReveal({ text, className = "", italic = false, delay = 0 }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${italic ? "italic" : ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: {
                y: "0%",
                rotate: 0,
                transition: { duration: 0.8, ease, delay: delay + i * 0.07 },
              },
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Button that is pulled toward the cursor (magnetic effect). */
function MagneticButton({ children, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="#"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.94 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neutral-200 px-8 py-4 text-[15px] font-medium text-neutral-900 ${className}`}
    >
      {/* sliding fill on hover */}
      <motion.span
        aria-hidden
        className="absolute inset-0 origin-bottom bg-[#6f8fa3]"
        initial={{ scaleY: 0 }}
        variants={{ hover: { scaleY: 1 } }}
        whileHover="hover"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
      <motion.svg
        viewBox="0 0 24 24"
        className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        whileHover={{ x: 4 }}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.a>
  );
}

/** Footer link with animated underline + slide + arrow. */
function FooterLink({ children }) {
  return (
    <motion.a
      href="#"
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative inline-flex items-center text-[17px] text-white/80 transition-colors hover:text-white"
    >
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative"
      >
        {children}
        <motion.span
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.35, ease }}
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#6f8fa3]"
        />
      </motion.span>
      <motion.span
        variants={{
          rest: { opacity: 0, x: -8 },
          hover: { opacity: 1, x: 12 },
        }}
        className="absolute right-[-26px] text-[#6f8fa3]"
      >
        →
      </motion.span>
    </motion.a>
  );
}

/** Infinite marquee strip. */
function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-5">
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="whitespace-nowrap font-serif text-2xl italic text-white/40 md:text-3xl">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#6f8fa3]" />
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#121212] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#121212] to-transparent" />
    </div>
  );
}

/** Giant brand wordmark – letters rise in one by one. */
function BigWordmark() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // Font size is based on the container width (cqw) and the number of
  // characters, so the wordmark always fits no matter how long BRAND is.
  const fontSize = `${96 / ((BRAND.length + 1) * 0.58)}cqw`;

  return (
    <div
      ref={ref}
      className="select-none overflow-hidden [container-type:inline-size]"
    >
      <div
        className="flex justify-center whitespace-nowrap font-serif font-semibold leading-[1.05] tracking-tight"
        style={{ fontSize }}
      >
        {BRAND.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: i * 0.05 }}
            whileHover={{ y: -12, color: "#6f8fa3" }}
            className="inline-block bg-gradient-to-b from-white/90 to-white/5 bg-clip-text text-transparent"
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: BRAND.length * 0.05 + 0.2 }}
          className="inline-block text-[#6f8fa3]"
        >
          .
        </motion.span>
      </div>
    </div>
  );
}

/* --------------------------- CTA section ------------------------ */

function CtaSection() {
  const ref = useRef(null);

  // cursor-follow spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(111,143,163,0.22), transparent 60%)`;

  // scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [-120, 160]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212] px-6"
    >
      {/* spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* floating orbs */}
      <motion.div
        aria-hidden
        style={{ y: orbY1 }}
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#6f8fa3]/20 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ y: orbY2 }}
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]"
      />

      {/* grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: headY, opacity }}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 text-center"
      >
        <motion.h2 className="font-serif text-5xl leading-[1.1] text-[#6f8fa3] sm:text-6xl md:text-7xl">
          <WordReveal text="Life doesn’t happen in silos." />
          <br />
          <WordReveal text="Your support" italic delay={0.4} />
          <WordReveal
            text="shouldn’t either."
            className="text-white"
            delay={0.6}
          />
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-14">
          <MagneticButton>Book a demo</MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- Footer --------------------------- */

export default function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <>
      <CtaSection />
      <Marquee />

      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-[#121212] px-6 pb-10 pt-32 text-white md:px-12 lg:px-[120px]"
      >
        {/* top animated gradient line */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#6f8fa3] to-transparent"
        />

        {/* ambient glow */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#6f8fa3]/25 blur-[140px]"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 mx-auto max-w-[1400px]"
        >
          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {columns.map((col) => (
              <motion.div key={col.title} variants={fadeUp}>
                <h3 className="mb-6 flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-white/50">
                  <motion.span
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-[#6f8fa3]"
                  />
                  {col.title}
                </h3>
                <motion.ul variants={stagger(0.06)} className="space-y-4">
                  {col.links.map((l) => (
                    <motion.li key={l} variants={fadeUp}>
                      <FooterLink>{l}</FooterLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>

          {/* divider that draws itself */}
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 1.2, ease } },
            }}
            className="mt-20 h-px origin-left bg-white/10"
          />

          {/* Legal + socials */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
          >
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
              {legalLinks.map((l) => (
                <li key={l}>
                  <motion.a
                    href="#"
                    whileHover={{ color: "#ffffff", y: -2 }}
                    className="text-white/70"
                  >
                    {l}
                  </motion.a>
                </li>
              ))}
            </ul>

            <ul className="flex items-center gap-4">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <motion.a
                    href="#"
                    aria-label={label}
                    whileHover={{
                      y: -6,
                      scale: 1.12,
                      backgroundColor: "#6f8fa3",
                      borderColor: "#6f8fa3",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Badges + copyright */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          >
            <div className="flex items-center gap-4">
              {["SOC 2", "Accredited", "Secure SSL"].map((b, i) => (
                <motion.div
                  key={b}
                  whileHover={{ y: -4, scale: 1.05 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[#6f8fa3]"
                    fill="currentColor"
                  >
                    <path d="M12 1.5 3.5 4.7v6.6c0 5 3.4 9.6 8.5 11.2 5.1-1.6 8.5-6.2 8.5-11.2V4.7zm-1.2 14.6-3.6-3.6 1.4-1.4 2.2 2.2 5-5 1.4 1.4z" />
                  </svg>
                  {b}
                </motion.div>
              ))}
            </div>

            <p className="text-[13px] text-white/70">
              © 2020–{new Date().getFullYear()} {BRAND}. All rights reserved.
            </p>
          </motion.div>
        </motion.div>

        {/* Giant wordmark with parallax */}
        {/* <motion.div style={{ y: wordY }} className="relative z-10 mt-20">
          <BigWordmark />
        </motion.div> */}

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          whileHover={{ y: -6, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-6 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white md:right-12"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      </footer>
    </>
  );
}
