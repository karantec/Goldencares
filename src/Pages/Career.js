import React, { useState } from "react";

const CareerPage = () => {
  // --- Form state ---
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    } else {
      setResumeFile(null);
      setFileName("No file chosen");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data (including file) to your backend
    console.log("Form data:", formData);
    console.log("Resume file:", resumeFile);
    alert("Application submitted! (This is a demo)");
  };

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Career Opportunities
          </h2>
          <p className="text-lg opacity-80 mt-2">
            Join the goldencares Construction (PCPL) team – Build your future
            with us
          </p>
        </div>
      </section>

      {/* ===== CAREER FORM ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                Submit Your Resume
              </h2>
              <p className="text-center text-gray-500 mb-8">
                Fill in the details below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label
                    htmlFor="position"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Select Position <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">— Select a position —</option>
                    <option value="civil-engineer">Civil Engineer</option>
                    <option value="site-supervisor">Site Supervisor</option>
                    <option value="project-manager">Project Manager</option>
                    <option value="architect">Architect</option>
                    <option value="structural-engineer">
                      Structural Engineer
                    </option>
                    <option value="quantity-surveyor">Quantity Surveyor</option>
                    <option value="site-engineer">Site Engineer</option>
                    <option value="planner">Planner / Scheduler</option>
                    <option value="safety-officer">Safety Officer</option>
                    <option value="electrical-engineer">
                      Electrical Engineer
                    </option>
                    <option value="mechanical-engineer">
                      Mechanical Engineer
                    </option>
                    <option value="hvac-technician">HVAC Technician</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="welder-fabricator">
                      Welder / Fabricator
                    </option>
                    <option value="accountant">Accountant</option>
                    <option value="hr-executive">HR Executive</option>
                    <option value="admin-assistant">
                      Administrative Assistant
                    </option>
                    <option value="store-keeper">Store Keeper</option>
                    <option value="driver">Driver</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label
                    htmlFor="resume"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Upload Resume (PDF / DOC){" "}
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="relative flex-1 w-full">
                      <div className="w-full border-2 border-dashed border-gray-300 rounded py-3 px-4 text-center text-gray-500 hover:bg-orange-50 transition cursor-pointer">
                        <i className="fa fa-upload mr-2"></i> Choose File
                      </div>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                    </div>
                    <span className="text-sm text-gray-500 min-w-[120px]">
                      {fileName}
                    </span>
                  </div>
                  <small className="text-gray-400 text-xs">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </small>
                </div>

                {/* Why join? */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-semibold text-gray-700 mb-1"
                  >
                    Why do you want to join goldencares Construction? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Tell us why you'd like to be part of our team..."
                  />
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    <i className="fa fa-paper-plane mr-2"></i> Submit
                    Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY JOIN US ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Why Join PCPL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Build a rewarding career with us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition duration-300">
              <div className="text-5xl text-orange-500 mb-4">
                <i className="flaticon-worker"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Growth Opportunities
              </h4>
              <p className="text-gray-600 text-sm">
                Continuous learning and career advancement in a growing
                organization.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition duration-300">
              <div className="text-5xl text-orange-500 mb-4">
                <i className="flaticon-gear"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Diverse Projects
              </h4>
              <p className="text-gray-600 text-sm">
                Work on impactful government infrastructure projects across
                Bihar.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition duration-300">
              <div className="text-5xl text-orange-500 mb-4">
                <i className="flaticon-factory"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Professional Environment
              </h4>
              <p className="text-gray-600 text-sm">
                Collaborative culture with experienced industry professionals.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition duration-300">
              <div className="text-5xl text-orange-500 mb-4">
                <i className="flaticon-3d-printer"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Innovation Focus
              </h4>
              <p className="text-gray-600 text-sm">
                Modern construction techniques and sustainable building
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerPage;
