import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const BRAND = "#07518a";

const LEFT_COLUMN = `Our Managing Director is a visionary technology entrepreneur and strategic leader with over 15 years of profound expertise in Information Technology, Artificial Intelligence-driven security solutions, smart governance, and digital transformation. Holding a Bachelor of Technology in Computer Science Engineering from Jawaharlal Nehru Technological University, Hyderabad, and an MBA from Osmania University, he combines deep technical acumen with robust business management skills that drive sustainable growth and pioneering innovation.

Since the inception of Brihaspathi Technologies, he has remained at the helm, providing steadfast leadership that has shaped the company’s trajectory as a leading system integrator in India. His forward-thinking vision has spearheaded transformative programs utilizing AI and IoT technologies, delivering scalable solutions that revolutionize governance, amplify security frameworks, and optimize operational efficiencies across government, banking, and enterprise sectors.

His tenure is marked by landmark initiatives, including the conceptualization and deployment of India’s most advanced AI-powered surveillance infrastructure and the execution of cutting-edge digital governance projects. These initiatives have not only elevated institutional capabilities but also significantly enhanced public safety and service delivery, driving Brihaspathi’s reputation as a trusted partner for complex, technology-intensive projects.

His commitment to innovation is reflected in the establishment of world-class manufacturing and development facilities, leveraging diverse technologies that underpin the company’s robust portfolio. Under his leadership, Brihaspathi Technologies achieved exponential growth in operational capacity and sectoral footprint, setting industry benchmarks in quality, scalability, and execution excellence.`;
const RIGHT_COLUMN = `A recognized leader beyond the corporate sphere, he has been honored with numerous awards reflecting his entrepreneurial leadership and industry contributions, including the Youngest Entrepreneur Award by APTA Katalyst (2025), the ET Excellence Awards (AP & Telangana, 2022), the Business Titans Chapter 3 Award in Abu Dhabi (2024), and the Hyderabad Radio City Business Icon Award (2022).

Additionally, his pioneering work in wireless radio technology earned the prestigious Skotch Award for CCTV Surveillance projects, underscoring his commitment to technological advancement and operational impact.

He actively contributes to the broader entrepreneurial ecosystem as a member of eminent organizations including Hyderabad Angels, The Indus Entrepreneurs (TiE) Group, and the Hyderabad Management Association (HMA). Through these platforms, he advocates for innovation, mentorship, and sustainable business practices, fostering collaboration and growth within the startup and corporate communities.

His strategic vision is anchored in creating sustainable value—balancing technological disruption with operational pragmatism and fiscal discipline. This has enabled Brihaspathi Technologies to consistently deliver end-to-end integrated solutions that empower clients to adapt to emerging challenges and capture new opportunities in a digital-first economy.

With an emphasis on ethical governance, transparency, and stakeholder engagement, he cultivates an inclusive culture that inspires innovation and performance excellence across all organizational levels. His leadership style encourages continuous learning, agility, and resilience, positioning the company to lead confidently in a rapidly evolving technological landscape.

Looking ahead, his focus remains on harnessing emerging technologies such as AI, IoT, and cloud computing to develop next-generation systems that contribute to national priorities in public safety, energy efficiency, and smart urban development.

`;

export default function MDLeadershipCard() {
  const cardRef = React.useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 15%"],
  });

  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-4%", "4%"]
  );
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["4%", "-4%"]
  );

  const fade = {
    initial: { opacity: 0, y: 12, filter: "blur(3px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <motion.article
        ref={cardRef}
        {...fade}
        className="relative mx-auto w-full max-w-6xl rounded-2xl border bg-white shadow-sm ring-1 ring-black/5"
        style={{
          borderColor: "rgba(7,81,138,0.14)",
          background:
            "linear-gradient(180deg, rgba(7,81,138,0.03), rgba(7,81,138,0.00))",
        }}
      >
        <header className="border-b">
          <div className="flex items-center gap-2 px-5 py-4 sm:px-7">
            <h2
              className="font-extrabold tracking-tight"
              style={{ color: BRAND, fontSize: "clamp(18px,2.5vw,26px)" }}
            >
              Managing Director
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            style={{ x: xLeft }}
            className="leading-relaxed text-slate-800"
          >
            {LEFT_COLUMN.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4 text-[15px] sm:text-[16px]">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            style={{ x: xRight }}
            className="leading-relaxed text-slate-800"
          >
            {RIGHT_COLUMN.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4 text-[15px] sm:text-[16px]">
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        <div
          aria-hidden
          className="h-2 w-full rounded-b-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,81,138,0.15), rgba(7,81,138,0.05) 40%, rgba(7,81,138,0.15))",
          }}
        />
      </motion.article>
    </section>
  );
}
