import React from "react";
import {
  Factory,
  HardHat,
  Cog,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Team from "./Team";

export default function AboutUsBody() {
  const workSteps = [
    {
      num: "01",
      title: "Planning & Research",
      desc: "We conduct thorough site assessments and feasibility studies to ensure every project is viable and well-planned.",
    },
    {
      num: "02",
      title: "Design & Engineering",
      desc: "Our design team creates detailed, compliant, and creative solutions tailored to your specific needs.",
    },
    {
      num: "03",
      title: "Execution & Monitoring",
      desc: "We manage construction with precision, using advanced equipment and strict quality checks at every milestone.",
    },
    {
      num: "04",
      title: "Delivery & Handover",
      desc: "We ensure timely completion and provide full support during project handover and post-construction phases.",
    },
  ];

  return (
    <main className="w-full bg-white text-slate-800 antialiased overflow-hidden">
      {/* ================= PAGE HEADER BANNER ================= */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f15d30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-[#f15d30] bg-[#f15d30]/10 rounded-full border border-[#f15d30]/20">
            goldencares Construction(P) Ltd.
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Building Infrastructure Bihar
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Delivering excellence through engineering discipline, community
            trust, and sustainable execution.
          </p>
        </div>
      </section>

      {/* ================= MAIN ABOUT SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold tracking-wider text-[#f15d30]">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Welcome to goldencares Construction (P) Ltd.
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  <strong className="text-slate-900 font-semibold">
                    goldencares Construction (P) Ltd.
                  </strong>{" "}
                  is a premier civil construction and infrastructure development
                  company based in Bihar, India. With an uncompromising
                  commitment to quality, safety, and strict delivery timelines,
                  we execute essential public and private sector projects across
                  the region.
                </p>
                <p>
                  Our expertise spans rural & urban water supply schemes, public
                  health engineering infrastructure, state-of-the-art
                  educational facilities, and complex multi-party civil
                  contracts.
                </p>
                <p>
                  We don't merely build structures—we construct foundational
                  community assets. Our core multidisciplinary team of
                  engineers, project directors, and skilled craftspeople
                  systematically translate ambitious blueprints into durable
                  reality.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-[#f15d30] shadow-md hover:shadow-xl hover:shadow-[#f15d30]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  More About Us
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Interactive Animated Cards */}
            <div className="lg:col-span-6 space-y-5">
              {/* Card 1 */}
              <div className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#f15d30]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex items-start gap-5">
                <div className="p-3.5 bg-orange-50 text-[#f15d30] rounded-xl flex-shrink-0 group-hover:bg-[#f15d30] group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors duration-200 mb-1.5">
                    Quality Assurance
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We enforce zero-tolerance quality audits and material
                    testing across procurement, concrete batching, and final
                    structural handover.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#f15d30]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex items-start gap-5">
                <div className="p-3.5 bg-orange-50 text-[#f15d30] rounded-xl flex-shrink-0 group-hover:bg-[#f15d30] group-hover:text-white group-hover:-rotate-6 transition-all duration-300 shadow-sm">
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors duration-200 mb-1.5">
                    Dedicated Workforce
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Skilled field supervisors, licensed structural engineers,
                    and machinery operators ensuring safe, on-schedule site
                    execution.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#f15d30]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex items-start gap-5">
                <div className="p-3.5 bg-orange-50 text-[#f15d30] rounded-xl flex-shrink-0 group-hover:bg-[#f15d30] group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <Cog className="w-6 h-6 group-hover:animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors duration-200 mb-1.5">
                    Innovative & Resilient Solutions
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Integration of modern civil mechanics, geo-technical
                    surveys, and climate-resilient water treatment
                    infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WORK PROCESS (Animated Cards Grid) ================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-wider text-[#f15d30]">
              Operational Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Our 4-Phase Delivery Process
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Systematic project lifecycle control from initial ground survey to
              post-handover integrity testing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((step) => (
              <div
                key={step.num}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-2xl hover:border-[#f15d30]/50 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 cursor-default overflow-hidden"
              >
                {/* Accent Top Border Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#f15d30] transition-all duration-300" />

                {/* Background Watermark Number */}
                <span className="absolute -bottom-4 -right-2 text-7xl font-black text-slate-100 select-none group-hover:text-orange-50/70 transition-colors duration-300">
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 mb-6 rounded-xl bg-slate-100 group-hover:bg-[#f15d30] text-slate-900 group-hover:text-white flex items-center justify-center text-sm font-black tracking-wider transition-all duration-300 shadow-sm">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors duration-200 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-[#f15d30] transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> Milestone Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KEY PROJECTS SECTION ================= */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Image Card with Floating Badge */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-4/3">
                <img
                  src="img/content-1.jpg"
                  alt="PCPL Project"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Turnover Impact
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">
                    ₹2.0+ Cr Executed
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-7 space-y-6 lg:pl-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#f15d30]">
                  Track Record
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Delivering Excellence Across Bihar
                </h2>
              </div>

              <div className="space-y-4">
                {/* Project Item 1 */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#f15d30]/30 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors">
                      PHED – Public Health Engineering Dept.
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Turnkey water supply system in Banka District comprising
                    production wells, driven pumps, pipeline distribution
                    networks, and treatment units.
                  </p>
                </div>

                {/* Project Item 2 */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#f15d30]/30 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors">
                      LAEO – Local Area Engineering Organization
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Civil infrastructure modernization, boundary walls, and
                    structural additions across state school complexes under the
                    Development Department.
                  </p>
                </div>

                {/* Project Item 3 */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#f15d30]/30 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-bold text-slate-900 group-hover:text-[#f15d30] transition-colors mb-1.5">
                    Urban Development & Housing Department
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Contracted for municipal civil upgrades, drain networks, and
                    concrete road construction prioritizing long-term
                    environmental durability.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/projects"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-[#f15d30] hover:bg-[#d94f26] shadow-lg shadow-[#f15d30]/25 hover:shadow-xl hover:shadow-[#f15d30]/35 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  View All Completed Projects
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <Team />
      </section>
    </main>
  );
}
