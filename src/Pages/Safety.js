import React from "react";
import { Link } from "react-router-dom";
import {
  FaHardHat,
  FaShieldAlt,
  FaUserCheck,
  FaCheckCircle,
  FaFileContract,
  FaVest,
  FaChalkboardTeacher,
  FaExclamationTriangle,
  FaHeartbeat,
  FaHandsHelping,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const safetyPillars = [
  {
    icon: FaChalkboardTeacher,
    title: "Mandatory Site Inductions",
    desc: "Comprehensive safety onboarding for all workers, engineers, and sub-contractors before entry into active civil and structural zones.",
  },
  {
    icon: FaHandsHelping,
    title: "Daily Tool Box Talks (TBT)",
    desc: "Shift-opening briefings covering trench safety, heavy machinery perimeters, scaffold integrity, and daily hazard mitigation.",
  },
  {
    icon: FaVest,
    title: "100% PPE Compliance",
    desc: "Strict enforcement of ISI-certified helmets, reflective safety vests, steel-toe boots, fall arrest harnesses, and eye protection.",
  },
  {
    icon: FaHeartbeat,
    title: "Worker Health & Welfare Camps",
    desc: "Routine on-site health checkups, clean drinking water stations, and hydration protocols across remote project locations in Bihar.",
  },
  {
    icon: FaFileContract,
    title: "Extended Vendor Guidelines",
    desc: "Our safety standards are directly enforced upon all contracted teams, logistics drivers, and material suppliers at our yards.",
  },
  {
    icon: FaExclamationTriangle,
    title: "Hazard Identification & Mitigation",
    desc: "Structured risk evaluations prior to pipeline trenching, high-elevation building construction, and heavy crane operations.",
  },
];

const safetyCommitments = [
  "Uncompromising target of 'ZERO reportable injuries' across all project fronts.",
  "Strict adherence to state and national construction safety regulations and labour codes.",
  "Certified inspections of scaffolding, cranes, concrete mixers, and electrical hookups.",
  "Standardized trench shoring and barricades for PHED pipeline and drainage networks.",
  "Mandatory safety audits extended to all sub-contractors and vendor workforces.",
];

const Safety = () => {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <FaShieldAlt className="text-orange-500" /> PCPL Health, Safety &
            Environment
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Targeting <span className="text-orange-500">Zero</span> Reportable
            Injuries
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            At <strong>goldencares Construction (PCPL)</strong>, paramount
            importance is given to safety at every juncture, every step of the
            way. We are committed to providing a safe, compliant, and healthy
            workplace across all civil campuses, school sites, and water supply
            projects.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#commitments"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-orange-500/25 transition-transform hover:-translate-y-0.5"
            >
              Our Safety Standards <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ===== KEY SAFETY METRICS ===== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <span className="text-5xl font-black text-orange-500">0</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Injury Benchmark
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Our continuous target at every active work front in Bihar.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <span className="text-5xl font-black text-slate-900">100%</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Mandatory Induction
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Every worker, supervisor, and engineer undergoes safety
                training.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <span className="text-5xl font-black text-orange-500">360°</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Extended Safety Net
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Safety protocols enforced across all partner contractors and
                suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAFETY PILLARS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">
              Field Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Our Safety Framework in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Practical safeguards embedded into daily operations across PHED
              water schemes, LAEO buildings, and urban roads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition group duration-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-200 mb-4 text-xl">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DETAILED POLICY & EXTENDED NETWORK ===== */}
      <section
        id="commitments"
        className="py-20 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-400 font-bold text-xs uppercase tracking-widest">
                Comprehensive Accountability
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                Safety Across Our Workforce, Partners & Vendors
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                It is our endeavor as an organisation to ensure that every task,
                job, or assignment is performed with absolute safety.
                goldencares Construction extends its safety systems to all
                contractors operating on our project sites, and we actively urge
                our material suppliers to adopt structured safety systems at
                their production facilities.
              </p>

              <ul className="mt-6 space-y-3.5">
                {safetyCommitments.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-300 text-sm"
                  >
                    <FaCheckCircle className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaHardHat className="text-orange-500 text-3xl" />
                <h3 className="text-xl font-bold text-white">
                  PCPL Field Mandate
                </h3>
              </div>
              <blockquote className="text-slate-300 italic text-sm leading-relaxed border-l-2 border-orange-500 pl-4 mb-6">
                "No construction deadline or cost consideration takes precedence
                over the life, health, and well-being of the individuals
                building our projects."
              </blockquote>
              <div className="space-y-4 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <FaUserCheck className="text-emerald-400 text-base flex-shrink-0" />
                  <span>Routine on-site sobriety and fitness evaluations</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUserCheck className="text-emerald-400 text-base flex-shrink-0" />
                  <span>
                    Mandatory safety harnesses for elevated structural works
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUserCheck className="text-emerald-400 text-base flex-shrink-0" />
                  <span>
                    Proper barricading & signage for public excavation projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-16 bg-orange-500 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold">
            Build with Uncompromised Safety
          </h2>
          <p className="mt-3 text-orange-100 text-sm sm:text-base max-w-2xl mx-auto">
            Collaborate with goldencares Construction for quality civil
            infrastructure executed with zero compromise on safety.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-orange-600 hover:bg-slate-100 font-bold px-8 py-3 rounded-lg shadow-md transition-transform hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;
