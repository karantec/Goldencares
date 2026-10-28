import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUserTie,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";

const directors = [
  {
    name: "Pawan Kumar Pushpam",
    role: "Director",
    phone: "+91 9939285181",
    telLink: "tel:+919939285181",
    email: "pawan.belchur@gmail.com",
    image: "/img/photo2.jpg",
    bio: "Driving strategic operations, project execution, and institutional partnerships across Bihar's public infrastructure initiatives.",
  },
  {
    name: "Gajendra Kumar Yadav",
    role: "Director",
    phone: "+91 9934181848",
    telLink: "tel:+919934181848",
    email: "mr.gajendra.kumar88@gmail.com",
    image: "/img/vercel1.jpg",
    bio: "Spearheading engineering compliance, resource allocation, and field execution across civil and water supply networks.",
  },
];

const Team = () => {
  return (
    <section className="py-20 bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3.5 py-1 rounded-full border border-orange-500/20">
            <FaUserTie /> Executive Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Guiding goldencares Construction
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Led by experienced infrastructure visionaries dedicated to
            engineering excellence, safety compliance, and on-time project
            completion.
          </p>
        </div>

        {/* Directors Grid with Large Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {directors.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Large Portrait Image Container */}
                <div className="relative w-full h-80 sm:h-96 bg-slate-800 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {/* Subtle Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge Over Photo */}
                  <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                    PCPL Board
                  </span>

                  {/* Name Over Photo for striking visual presence */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="inline-block text-xs font-bold text-orange-400 uppercase tracking-widest">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <a
                      href={member.telLink}
                      className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors text-sm group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors flex-shrink-0">
                        <FaPhoneAlt className="text-xs" />
                      </div>
                      <span className="font-semibold">{member.phone}</span>
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors text-sm group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors flex-shrink-0">
                        <FaEnvelope className="text-xs" />
                      </div>
                      <span className="font-semibold break-all">
                        {member.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>goldencares Construction (P) Ltd.</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <FaShieldAlt className="text-emerald-500" /> Authorized
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Communication Footer Card */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm shadow-orange-500/20">
              <FaBuilding />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Official Corporate Inquiries
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                For tenders, client agreements, and administrative
                correspondence.
              </p>
            </div>
          </div>

          <a
            href="mailto:goldencaresconstruction@gmail.com"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-500 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow transition-all duration-200 hover:-translate-y-0.5"
          >
            <FaEnvelope /> goldencaresconstruction@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;
