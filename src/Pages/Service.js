import React, { useState } from "react";
import {
  FaHardHat,
  FaRobot,
  FaWater,
  FaDraftingCompass,
  FaTools,
  FaTasks,
  FaRoad,
  FaArchway,
  FaBolt,
  FaSnowflake,
  FaPaintBrush,
  FaTree,
  FaTrashAlt,
  FaLeaf,
  FaShieldAlt,
  FaCubes,
  FaLayerGroup,
  FaFillDrip,
  FaUmbrella,
  FaStar,
  FaQuoteRight,
  FaChevronUp,
} from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";

// ─── Services Data (23 items) ───────────────────────────────────────────────
const services = [
  {
    icon: FaHardHat,
    title: "General Building",
    desc: "Residential, commercial, and institutional buildings with superior quality and on-time delivery.",
  },
  {
    icon: FaRobot,
    title: "Building Construction",
    desc: "End-to-end construction from foundation to finishing, using modern techniques and best materials.",
  },
  {
    icon: FaWater,
    title: "Water Supply Schemes",
    desc: "Design, construction, and testing of water supply networks with driven pumps and treatment plants (PHED projects).",
  },
  {
    icon: FaDraftingCompass,
    title: "Infrastructure Development",
    desc: "Multi‑party civil works, school infrastructure, and urban development projects under government schemes.",
  },
  {
    icon: FaTools,
    title: "Refurbishment & Renovation",
    desc: "Complete renovation of existing structures, enhancing functionality and aesthetic appeal.",
  },
  {
    icon: FaTasks,
    title: "Architectural Planning",
    desc: "Detailed architectural drawings, structural designs, and project planning tailored to your needs.",
  },
  {
    icon: FaShieldAlt,
    title: "Public Health Engineering",
    desc: "Specialised services for sanitation, water treatment, and public health infrastructure.",
  },
  {
    icon: FaTasks,
    title: "Project Management",
    desc: "Comprehensive management from inception to handover, ensuring cost, time, and quality control.",
  },
  {
    icon: FaRoad,
    title: "Road & Highway Construction",
    desc: "Design and construction of roads, highways, and rural connectivity projects with durable materials.",
  },
  {
    icon: FaArchway,
    title: "Bridge & Overpass Construction",
    desc: "Structural design and erection of bridges, flyovers, and grade separators for safe and efficient transport.",
  },
  {
    icon: FaBolt,
    title: "Electrical Works & Installation",
    desc: "Complete electrical services – wiring, panels, lighting, and power distribution for residential and commercial projects.",
  },
  {
    icon: FaWater,
    title: "Plumbing & Sanitary Systems",
    desc: "Installation of water supply, drainage, and sanitary fixtures with high-quality pipes and fittings.",
  },
  {
    icon: FaSnowflake,
    title: "HVAC & Mechanical Systems",
    desc: "Heating, ventilation, air conditioning, and mechanical systems for comfortable and efficient environments.",
  },
  {
    icon: FaPaintBrush,
    title: "Interior Design & Decoration",
    desc: "Creative and functional interior solutions, including finishes, furniture, and aesthetic enhancements.",
  },
  {
    icon: FaTree,
    title: "Landscaping & Site Development",
    desc: "Exterior beautification, green spaces, and site preparation for harmonious integration with nature.",
  },
  {
    icon: FaTrashAlt,
    title: "Demolition & Site Clearance",
    desc: "Safe and efficient demolition of structures with complete debris removal and site preparation.",
  },
  {
    icon: FaLeaf,
    title: "Environmental Sustainability",
    desc: "Eco-friendly construction practices, waste management, and green building certifications.",
  },
  {
    icon: FaShieldAlt,
    title: "Safety & Risk Management",
    desc: "Comprehensive safety audits, hazard identification, and risk mitigation for all project phases.",
  },
  {
    icon: FaCubes,
    title: "Prefab & Modular Construction",
    desc: "Fast, cost‑effective prefabricated and modular building solutions for various project types.",
  },
  {
    icon: FaLayerGroup,
    title: "Foundation & Piling Works",
    desc: "Deep foundation, piling, and ground improvement for load‑bearing stability in challenging soils.",
  },
  {
    icon: FaFillDrip,
    title: "Painting & Finishing",
    desc: "High‑quality interior and exterior painting, plastering, and protective coatings for lasting beauty.",
  },
  {
    icon: FaTrainSubway,
    title: "Railway Infrastructure & Civil Works",
    desc: "Earthwork, track bed stabilization, platform development, station building civil works, and rail-adjacent drainage systems.",
  },
  {
    icon: FaUmbrella,
    title: "Roofing & Waterproofing",
    desc: "Durable roofing systems and advanced waterproofing solutions to protect structures from water damage.",
  },
  {
    icon: FaHardHat,
    title: "Fabrication Work",
    desc: "Custom metal fabrication, welding, structural steel works, and pre‑engineered building components for industrial and commercial projects.",
  },
];

// ─── Testimonials Data (30 items) ──────────────────────────────────────────
const testimonials = [
  {
    text: "goldencares Construction delivered our water supply project on time with outstanding quality. Their professionalism is unmatched.",
    name: "Er. R. Kumar",
    role: "PHED Engineer",
  },
  {
    text: "The school infrastructure project was executed flawlessly. The team was cooperative and maintained high safety standards.",
    name: "Ms. S. Sharma",
    role: "LAEO Coordinator",
  },
  {
    text: "PCPL’s commitment to urban development projects is commendable. They bring innovation and reliability to every site.",
    name: "Mr. A. Singh",
    role: "Urban Development Dept.",
  },
  {
    text: "We have partnered with goldencares Construction for multiple road projects. Their execution speed and quality are top‑notch.",
    name: "Mr. D. Jha",
    role: "Project Manager, NHAI",
  },
  {
    text: "The bridge construction was completed two months early. PCPL’s engineering team is highly skilled and professional.",
    name: "Er. V. Verma",
    role: "Chief Engineer, PWD",
  },
  {
    text: "goldencares Construction handled our electrical and plumbing work with great precision. Highly recommend their MEP services.",
    name: "Mrs. P. Gupta",
    role: "Real Estate Developer",
  },
  {
    text: "They renovated our old school building to a modern facility. The team was very considerate of the students' safety.",
    name: "Mr. S. Thakur",
    role: "Headmaster, Govt. High School",
  },
  {
    text: "The water treatment plant designed by PCPL is running efficiently. Their technical expertise is evident.",
    name: "Dr. M. Rahman",
    role: "Public Health Specialist",
  },
  {
    text: "From architectural planning to final handover, PCPL provided end‑to‑end solutions. We are thrilled with our new office.",
    name: "Ms. N. Bhardwaj",
    role: "Director, Corporate Client",
  },
  {
    text: "Their safety protocols during demolition and reconstruction were exemplary. Zero incidents and total compliance.",
    name: "Mr. L. Roy",
    role: "Safety Officer, Govt. Project",
  },
  {
    text: "We engaged PCPL for interior design and they transformed our client’s vision into reality. Exceptional taste.",
    name: "Mr. A. Khan",
    role: "Interior Designer (Collaborator)",
  },
  {
    text: "The rural road connectivity project improved the lives of thousands. PCPL’s work is durable and community‑focused.",
    name: "Mrs. K. Devi",
    role: "District Development Officer",
  },
  {
    text: "They completed the multi‑storey building on a tight schedule. The quality of finishing is world‑class.",
    name: "Er. S. Nair",
    role: "Construction Consultant",
  },
  {
    text: "The environmental sustainability practices adopted by PCPL reduced our carbon footprint significantly.",
    name: "Mr. P. Mehta",
    role: "Environmental Analyst",
  },
  {
    text: "goldencares Construction managed our complex project with excellent coordination. Their project management is outstanding.",
    name: "Ms. R. Shah",
    role: "Program Manager, Government Agency",
  },
  {
    text: "The prefab modular construction saved us time and cost without compromising quality. Highly innovative.",
    name: "Mr. V. Reddy",
    role: "Project Director, Housing Board",
  },
  {
    text: "We appreciate the transparency and regular progress updates. PCPL kept us informed at every stage.",
    name: "Mrs. S. Bose",
    role: "Client Representative",
  },
  {
    text: "The foundation and piling work performed by PCPL was flawless. Our building now stands on solid ground.",
    name: "Er. D. Mishra",
    role: "Geotechnical Engineer",
  },
  {
    text: "Their roofing and waterproofing solutions saved us from monsoon damages. Excellent craftsmanship.",
    name: "Mr. T. Yadav",
    role: "Facility Manager",
  },
  {
    text: "goldencares Construction has a great team of architects who listen to our needs and deliver creative designs.",
    name: "Ms. J. Menon",
    role: "Homeowner",
  },
  {
    text: "We hired them for painting and finishing, and the final look exceeded our expectations. Attention to detail is superb.",
    name: "Mr. G. Patil",
    role: "Property Owner",
  },
  {
    text: "PCPL handled our urban housing project with great efficiency. They coordinated well with all stakeholders.",
    name: "Mr. U. Das",
    role: "Housing Commissioner",
  },
  {
    text: "Their HVAC systems are energy‑efficient and well installed. Our building now maintains perfect climate control.",
    name: "Dr. P. Nayak",
    role: "Hospital Administrator",
  },
  {
    text: "The landscaping and site development improved our campus aesthetics significantly. PCPL turned our outdoor space into a green haven.",
    name: "Mr. F. Ahmed",
    role: "Facilities Director",
  },
  {
    text: "We were impressed by their risk management and safety audits. They made our worksite one of the safest.",
    name: "Mr. S. Rathore",
    role: "HSE Manager",
  },
  {
    text: "PCPL has a very responsive customer service. Any issues were resolved quickly and professionally.",
    name: "Mrs. K. Anand",
    role: "Residential Client",
  },
  {
    text: "We have worked with many contractors, but PCPL stands out for their integrity and commitment to quality.",
    name: "Mr. N. Sinha",
    role: "Supply Chain Partner",
  },
  {
    text: "The drainage and sanitation systems installed by PCPL are robust and have solved our long‑standing civic issues.",
    name: "Mr. J. Mukherjee",
    role: "Municipal Engineer",
  },
  {
    text: "They rebuilt our community hall after a fire. The new structure is even better and more fire‑resistant.",
    name: "Mr. O. Fernandez",
    role: "Community Leader",
  },
  {
    text: "goldencares Construction is our go‑to partner for all construction needs. They never disappoint on quality or deadlines.",
    name: "Mr. H. Malhotra",
    role: "Repeat Client",
  },
];

const INITIAL_SERVICES = 8;
const INITIAL_TESTIMONIALS = 8;

export default function ServicesPage() {
  const [servicesVisible, setServicesVisible] = useState(INITIAL_SERVICES);
  const [testimonialsVisible, setTestimonialsVisible] =
    useState(INITIAL_TESTIMONIALS);

  const loadMoreServices = () => setServicesVisible(services.length);
  const loadMoreTestimonials = () =>
    setTestimonialsVisible(testimonials.length);

  const displayedServices = services.slice(0, servicesVisible);
  const displayedTestimonials = testimonials.slice(0, testimonialsVisible);

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-800 antialiased">
      {/* Hero */}
      <section className="bg-neutral-900 py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Our Services
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            Comprehensive construction and infrastructure solutions across Bihar
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-6 rounded-md shadow-sm border border-neutral-200/60 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#f15d30] hover:shadow-xl hover:border-transparent flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-center mb-4 text-[#f15d30] group-hover:text-white transition-colors">
                    <Icon size={44} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-4 group-hover:text-white/90 transition-colors">
                    {item.desc}
                  </p>
                </div>
                <a
                  href="#"
                  className="text-sm font-semibold text-[#f15d30] group-hover:text-white group-hover:underline transition-colors mt-auto"
                >
                  Read More
                </a>
              </div>
            );
          })}
        </div>

        {servicesVisible < services.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMoreServices}
              className="px-8 py-3 bg-[#f15d30] text-white font-semibold rounded hover:bg-[#d94d23] transition shadow-md hover:shadow-lg"
            >
              Load More Services ({services.length - servicesVisible} remaining)
            </button>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-200/50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#f15d30] font-semibold text-sm tracking-wider uppercase">
              Testimonial
            </span>
            <h2 className="text-3xl font-bold text-neutral-900 mt-1">
              What our clients say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-6 rounded-lg shadow-sm border border-neutral-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f15d30] hover:shadow-xl hover:border-transparent flex flex-col justify-between text-center overflow-hidden"
              >
                <div>
                  <p className="text-sm text-neutral-600 italic mb-4 leading-relaxed group-hover:text-white/90 transition-colors">
                    "{t.text}"
                  </p>
                  <h3 className="text-base font-semibold text-neutral-900 group-hover:text-white transition-colors">
                    {t.name}
                  </h3>
                  <div className="flex justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-amber-400 group-hover:text-white transition-colors"
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 block group-hover:text-white/80 transition-colors">
                    {t.role}
                  </span>
                </div>
                <FaQuoteRight
                  className="absolute bottom-3 right-3 text-[#f15d30] opacity-10 group-hover:text-white group-hover:opacity-20 transition-all"
                  size={36}
                />
              </div>
            ))}
          </div>

          {testimonialsVisible < testimonials.length && (
            <div className="text-center mt-10">
              <button
                onClick={loadMoreTestimonials}
                className="px-8 py-3 bg-[#f15d30] text-white font-semibold rounded hover:bg-[#d94d23] transition shadow-md hover:shadow-lg"
              >
                Load More Testimonials (
                {testimonials.length - testimonialsVisible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 bg-[#f15d30] text-white rounded-full shadow-lg hover:bg-[#d94d23] transition"
        aria-label="Scroll to top"
      >
        <FaChevronUp size={20} />
      </button>
    </div>
  );
}
