import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

/* ----------------------------- Config ----------------------------- */

const BRAND = "yourbrand."; // replace with your logo <img /> or wordmark
const BANNER_H = 40; // px – height of the announcement bar
const ease = [0.22, 1, 0.36, 1];

const banner = {
  tag: "New",
  text: "Nov 12 | Webinar featuring Google: grief doesn’t end when leave does",
  href: "#",
};

/* ------------------------------ Icons ----------------------------- */

const ICONS = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </>
  ),
  heart: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  message: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  landmark: (
    <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 3 7h18z" />
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  book: (
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  ),
  video: (
    <>
      <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </>
  ),
  file: (
    <>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 5-10 5L2 7z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  news: (
    <>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
    </>
  ),
  star: (
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2 2 9.3l6.9-1z" />
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </>
  ),
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
};

const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {ICONS[name]}
  </svg>
);

/* ------------------------------- Data ----------------------------- */

/**
 * - items with `links` → open the mega-menu (desktop) / accordion (mobile)
 * - items with only `href` → plain link
 * - `promo.image` → optional photo URL, otherwise a gradient is used
 */
const menus = [
  {
    label: "Platform",
    blurb: "One connected platform for life’s hardest moments.",
    links: [
      {
        label: "Platform Overview",
        desc: "See how everything fits together",
        icon: "grid",
      },
      {
        label: "Estate Planning",
        desc: "Guided wills, trusts & documents",
        icon: "home",
      },
      {
        label: "Bereavement Care",
        desc: "Compassionate support after loss",
        icon: "heart",
      },
      {
        label: "Leave Support",
        desc: "Help employees through time away",
        icon: "calendar",
      },
      {
        label: "Caregiving Support",
        desc: "Resources for family caregivers",
        icon: "users",
      },
      {
        label: "Client Engagement",
        desc: "Stay close to the people you serve",
        icon: "message",
      },
    ],
    promo: {
      title: "Explore the platform",
      sub: "Take a guided tour",
      image: "",
      gradient: "from-[#3b4a6b] via-[#7b5d9a] to-[#e39a7b]",
    },
  },
  {
    label: "Who We Serve",
    blurb: "Built for the teams that care for people.",
    links: [
      {
        label: "Insurance",
        desc: "Elevate claims & member experience",
        icon: "shield",
      },
      {
        label: "Financial Services",
        desc: "Deepen trust with every client",
        icon: "landmark",
      },
      {
        label: "Employers",
        desc: "Support your people through life events",
        icon: "briefcase",
      },
    ],
    promo: {
      title: "Built for every industry",
      sub: "Find your solution",
      image: "",
      gradient: "from-[#2f5d62] via-[#4f8b7e] to-[#bfe3d6]",
    },
  },
  { label: "Customers", href: "#" },
  {
    label: "Resources",
    blurb: "Research, stories and tools to learn from.",
    links: [
      {
        label: "Research",
        desc: "Data-backed insights & reports",
        icon: "book",
      },
      {
        label: "Events & Webinars",
        desc: "Learn live from the experts",
        icon: "video",
      },
      {
        label: "Articles",
        desc: "Guides, tips and perspectives",
        icon: "file",
      },
      {
        label: "All Resources",
        desc: "Browse the full library",
        icon: "layers",
      },
    ],
    promo: {
      title: "Explore our resources",
      sub: "Learn more",
      image: "",
      gradient: "from-[#5b2a2f] via-[#9a3f4b] to-[#e6bfa8]",
    },
  },
  {
    label: "Company",
    blurb: "The people and purpose behind the platform.",
    links: [
      { label: "About Us", desc: "Our mission and story", icon: "info" },
      { label: "In the News", desc: "Press and media coverage", icon: "news" },
      { label: "Our Experts", desc: "Meet the care specialists", icon: "star" },
      { label: "The Alliance", desc: "Our partner network", icon: "link" },
      { label: "Careers", desc: "Join the team", icon: "briefcase" },
    ],
    promo: {
      title: "Meet our team",
      sub: "We’re hiring",
      image: "",
      gradient: "from-[#1f2a44] via-[#4a5f95] to-[#9fb4de]",
    },
  },
];

/* -------------------------- Announcement bar ---------------------- */

function AnnouncementBar({ open, onClose }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="banner"
          initial={{ height: 0 }}
          animate={{ height: BANNER_H }}
          exit={{ height: 0 }}
          transition={{ duration: 0.45, ease }}
          className="relative z-[55] overflow-hidden bg-[#141414] text-white"
        >
          {/* shimmer sweep */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/4 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ left: ["-30%", "130%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          <div className="relative flex h-10 items-center justify-center gap-3 px-12">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider sm:inline-flex">
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-[#ff9a6c]"
              />
              {banner.tag}
            </span>

            <motion.a
              href={banner.href}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="truncate text-[12px] font-medium sm:text-[13px]"
            >
              {banner.text}{" "}
              <motion.span
                className="inline-block"
                variants={{ rest: { x: 0 }, hover: { x: 6 } }}
              >
                →
              </motion.span>
            </motion.a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close announcement"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition hover:rotate-90 hover:text-white sm:right-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------- Mega panel -------------------------- */

function MegaPanel({ menu }) {
  return (
    <motion.div
      key={menu.label}
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.35, ease }}
      className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="grid grid-cols-[1fr_360px] gap-2 p-3">
        {/* links */}
        <div className="p-4 pr-2">
          <div className="mb-4 flex items-baseline gap-3 px-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {menu.label}
            </span>
            <span className="text-[12px] text-neutral-400">{menu.blurb}</span>
          </div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.045 } } }}
            className="grid grid-cols-2 gap-1"
          >
            {menu.links.map((l) => (
              <motion.li
                key={l.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease },
                  },
                }}
              >
                <a
                  href="#"
                  className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-neutral-100"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-950 group-hover:text-white">
                    <Icon name={l.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-[14.5px] font-medium text-neutral-900">
                      {l.label}
                      <span className="inline-block -translate-x-1 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">
                      {l.desc}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* promo card */}
        <motion.a
          href="#"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
          className="group relative m-1 block min-h-[240px] overflow-hidden rounded-3xl"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${menu.promo.gradient} transition-transform duration-700 group-hover:scale-110`}
            style={
              menu.promo.image
                ? {
                    backgroundImage: `url(${menu.promo.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
          {/* floating decorative orbs */}
          <motion.span
            aria-hidden
            animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/25 blur-2xl"
          />
          <motion.span
            aria-hidden
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 left-6 h-32 w-32 rounded-full bg-black/20 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
            <div>
              <p className="text-[18px] font-semibold leading-tight">
                {menu.promo.title}
              </p>
              <p className="mt-1 text-[13px] text-white/80">{menu.promo.sub}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
              <Icon name="arrow" className="h-[18px] w-[18px]" />
            </span>
          </div>
        </motion.a>
      </div>

      {/* footer strip */}
      <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-8 py-3 text-[12px]">
        <span className="flex items-center gap-2 text-neutral-500">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-emerald-500"
          />
          Not sure where to start? Our team is happy to help.
        </span>
        <a href="#" className="font-medium text-neutral-900 hover:underline">
          Talk to us →
        </a>
      </div>
    </motion.div>
  );
}

/* --------------------------- Mobile menu -------------------------- */

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile"
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-white text-neutral-900 lg:hidden"
        >
          {/* decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ffb48a]/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#b9a6ff]/40 blur-3xl"
          />

          <div className="relative flex h-20 items-center justify-between px-6">
            <span className="font-serif text-[26px] font-semibold tracking-tight">
              {BRAND}
            </span>
            <motion.button
              whileTap={{ scale: 0.85, rotate: 90 }}
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </motion.button>
          </div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.07, delayChildren: 0.3 },
              },
            }}
            className="relative flex-1 overflow-y-auto px-6"
          >
            {menus.map((m, idx) => {
              const isOpen = expanded === m.label;
              return (
                <motion.li
                  key={m.label}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease },
                    },
                  }}
                  className="border-b border-neutral-200/80"
                >
                  {m.links ? (
                    <>
                      <button
                        onClick={() => setExpanded(isOpen ? null : m.label)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="flex items-baseline gap-3 text-[22px] tracking-tight">
                          <span className="text-[11px] text-neutral-400">
                            0{idx + 1}
                          </span>
                          {m.label}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-lg leading-none"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="overflow-hidden"
                          >
                            {m.links.map((l) => (
                              <li key={l.label}>
                                <a
                                  href="#"
                                  className="flex items-center gap-3 rounded-xl py-2.5 pl-1 text-[15px] text-neutral-600 active:bg-neutral-100"
                                >
                                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                                    <Icon name={l.icon} className="h-4 w-4" />
                                  </span>
                                  {l.label}
                                </a>
                              </li>
                            ))}
                            <li className="h-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={m.href}
                      className="flex items-baseline gap-3 py-4 text-[22px] tracking-tight"
                    >
                      <span className="text-[11px] text-neutral-400">
                        0{idx + 1}
                      </span>
                      {m.label}
                    </a>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="relative border-t border-neutral-200/80 bg-white/70 p-5 backdrop-blur">
            <motion.a
              href="#"
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-full bg-black py-3.5 text-[15px] font-medium text-white"
            >
              Book a demo <Icon name="arrow" className="h-[18px] w-[18px]" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ Navbar ---------------------------- */

export default function Navbar() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [active, setActive] = useState(null); // label of open mega-menu
  const [hovered, setHovered] = useState(null); // label under the cursor
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      // hide on scroll down, reveal on scroll up
      if (y > 500 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeMenu = menus.find((m) => m.label === active && m.links);
  const top = bannerOpen ? Math.max(0, BANNER_H - scrollY) : 0;
  const scrolled = scrollY > BANNER_H + 10;
  const solid = scrolled || Boolean(activeMenu);

  return (
    <>
      <AnnouncementBar open={bannerOpen} onClose={() => setBannerOpen(false)} />

      {/* blurred backdrop while a mega-menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-40 hidden bg-black/30 backdrop-blur-md lg:block"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: hidden && !activeMenu && !mobileOpen ? -140 : 0,
          opacity: 1,
          paddingTop: scrolled ? 12 : 0,
        }}
        transition={{ duration: 0.5, ease }}
        style={{ top }}
        className="fixed inset-x-0 z-50 px-3 sm:px-5"
      >
        <motion.div
          onMouseLeave={() => {
            setActive(null);
            setHovered(null);
          }}
          animate={{
            maxWidth: scrolled ? 1280 : 1552,
            borderRadius: scrolled ? 9999 : 0,
          }}
          transition={{ duration: 0.6, ease }}
          className="relative mx-auto w-full"
        >
          {/* bar */}
          <div
            className={`relative flex h-[64px] items-center justify-between px-5 transition-all duration-500 lg:px-7 ${
              solid
                ? "rounded-full border border-black/5 bg-white/85 text-neutral-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                : "rounded-full border border-transparent text-white"
            }`}
          >
            {/* left */}
            <div className="flex items-center gap-8 xl:gap-12">
              <a
                href="#"
                className="font-serif text-[26px] font-semibold leading-none tracking-tight"
              >
                {BRAND}
              </a>

              <nav className="hidden items-center lg:flex">
                {menus.map((m) => {
                  const isActive = active === m.label;
                  return (
                    <a
                      key={m.label}
                      href={m.href || "#"}
                      onMouseEnter={() => {
                        setHovered(m.label);
                        setActive(m.links ? m.label : null);
                      }}
                      className="relative px-3.5 py-2 text-[14px] font-medium"
                    >
                      {hovered === m.label && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className={`absolute inset-0 rounded-full ${
                            solid ? "bg-black/[0.06]" : "bg-white/15"
                          }`}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        {m.label}
                        {m.links && (
                          <motion.svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 opacity-70"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3, ease }}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </motion.svg>
                        )}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* right */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="hidden px-4 py-2 text-[14px] font-medium opacity-80 transition hover:opacity-100 xl:inline-block"
              >
                Sign in
              </a>

              <motion.a
                href="#"
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                animate="rest"
                className={`group relative hidden items-center gap-2 overflow-hidden rounded-full py-1.5 pl-5 pr-1.5 text-[14px] font-medium transition-colors duration-300 lg:inline-flex ${
                  solid
                    ? "bg-neutral-950 text-white"
                    : "bg-white text-neutral-900"
                }`}
              >
                <span className="relative z-10">Book a demo</span>
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${
                    solid
                      ? "bg-white text-neutral-950"
                      : "bg-neutral-950 text-white"
                  }`}
                >
                  <motion.span
                    variants={{
                      rest: { x: 0, y: 0 },
                      hover: { x: [0, 28, -28, 0], y: [0, -28, 28, 0] },
                    }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <Icon name="arrow" className="h-4 w-4" />
                  </motion.span>
                </span>
              </motion.a>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>

            {/* scroll progress */}
            {scrolled && (
              <motion.div
                aria-hidden
                style={{ scaleX: progress }}
                className="absolute bottom-0 left-8 right-8 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#ff9a6c] via-[#c084fc] to-[#60a5fa]"
              />
            )}
          </div>

          {/* desktop mega-menu (pt keeps hover alive across the gap) */}
          <AnimatePresence>
            {activeMenu && (
              <div className="absolute left-0 right-0 top-full hidden pt-3 lg:block">
                <MegaPanel menu={activeMenu} />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
