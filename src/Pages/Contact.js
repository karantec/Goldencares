import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

      {/* ===== HEADER SECTION ===== */}
      <section className="pt-20 pb-12 text-center relative z-10 px-4">
        <span className="inline-block py-1.5 px-4 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold tracking-wider uppercase mb-4 animate-bounce">
          Connect With Us
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
          Let’s Build Something <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
            Extraordinary Together
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base">
          Have a project in mind, need a consultation, or just want to say
          hello? Reach out to our team today.
        </p>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="container mx-auto px-4 pb-20 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Contact Information Card (Vibrant Orange Card) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
            {/* Subtle glow circle */}
            <div className="absolute -right-20 -top-20 w-56 h-56 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                goldencares <br /> Construction (P) Ltd.
              </h2>
              <p className="text-orange-50 text-sm leading-relaxed border-b border-white/20 pb-6">
                A trusted name in building and infrastructure. We bring your
                dreams to life with uncompromising quality, integrity, and
                safety.
              </p>

              {/* Info Items */}
              <div className="space-y-5 text-sm">
                {/* Location */}
                <div className="flex items-start space-x-3.5 group/item">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm group-hover/item:bg-white group-hover/item:text-orange-600 transition duration-300">
                    <svg
                      className="w-5 h-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Office Location
                    </h4>
                    <p className="text-orange-100 text-xs leading-relaxed mt-0.5">
                      Village Kharwajor, Mothawari, Katoria, <br />
                      Dist – Banka, Bihar – 813106
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5 group/item">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm group-hover/item:bg-white group-hover/item:text-orange-600 transition duration-300">
                    <svg
                      className="w-5 h-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Us</h4>
                    <a
                      href="mailto:info@goldencaresconstruction.com"
                      className="text-orange-100 text-xs hover:text-white underline-offset-2 hover:underline transition block mt-0.5"
                    >
                      info@goldencaresconstruction.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5 group/item">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm group-hover/item:bg-white group-hover/item:text-orange-600 transition duration-300">
                    <svg
                      className="w-5 h-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us</h4>
                    <a
                      href="tel:+918789970312"
                      className="text-orange-100 text-xs hover:text-white underline-offset-2 hover:underline transition block mt-0.5"
                    >
                      +91 878 997 0312
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3.5 group/item">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm group-hover/item:bg-white group-hover/item:text-orange-600 transition duration-300">
                    <svg
                      className="w-5 h-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Working Hours</h4>
                    <p className="text-orange-100 text-xs mt-0.5">
                      Mon – Sat: 9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
              <span className="text-xs uppercase tracking-wider text-orange-100 font-medium block">
                Serving All Over Bihar & Neighboring Regions
              </span>
            </div>
          </div>

          {/* RIGHT: Contact Form (Clean White Card) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col justify-center relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Send us a message
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Subject / Project Type
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  placeholder="e.g. Commercial Construction, Renovation"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition resize-none"
                  placeholder="Tell us a little bit about your project and requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                  status === "success"
                    ? "bg-emerald-600 text-white shadow-emerald-500/20"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 active:scale-[0.99] transform"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Transmitting...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ===== MAP CONTAINER ===== */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50 relative group">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 py-2 px-4 rounded-xl text-xs font-semibold text-slate-700 shadow-sm pointer-events-none flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            Our Site & Headquarters
          </div>
          <div className="w-full h-80 sm:h-96 relative">
            <iframe
              title="Google Map - Banka Bihar"
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4483.481640062111!2d86.76425317606736!3d24.838917346118034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f107b0c5af44fd%3A0xaa528e646edc9b74!2sRQQ8%2BHP8%2C%20Mothawari%2C%20Bihar!5e1!3m2!1sen!2sin!4v1788862992563!5m2!1sen!2sin"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
