/* =========================
   How to use (example)
   ----------------------
   import "antd/dist/reset.css";
   import LeadershipTeamWithPreview from "./components/LeadershipTeamWithPreview";
   export default function App() {
     return <LeadershipTeamWithPreview />;
   }
========================= */
// src/components/LeadershipTeamWithPreview.jsx
// JS-only, single file: data + component + styles (no Next.js features)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Image, Typography, Tag, Space } from "antd";
import { Users, MapPin } from "lucide-react"; // Removed Linkedin icon import
import { motion, MotionConfig, useReducedMotion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

/* =========================
   Brand & UI constants
========================= */
const BRAND = "#07518a";
const PANEL_HEIGHT = 400;
const CARD_RADIUS = 14;
const CARD_SHADOW = "0 10px 28px rgba(0,0,0,0.08)";
const GRID_GUTTER = [24, 32]; // [horizontal, vertical]
const LINKEDIN_IMG = "/social.png"; // your LinkedIn logo image

/* =========================
   Helpers
========================= */
const initialsAvatar = (name) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&backgroundType=gradientLinear&fontFamily=Arial&fontWeight=700`;

/* =========================
   Data (inline, JS only)
========================= */
// (Your full ORG_GROUPS data remains unchanged)
const ORG_GROUPS = [
  {
    id: "our-team",
    title: "Our Team",
    people: [
      // C-level
      {
        id: 4,
        name: "Madhu Kuppani",
        bio: "Chief Operating Officer – Retail Sales with 25+ years in banking. Commerce graduate and decade-long contributor driving retail growth through project, financial, and risk management. Renowned communicator and negotiator, he builds high-performance teams, mentors sales talent, and champions customer-centric execution that strengthens client relationships, accelerates revenue, and sustains scalable excellence.",
        designation: "Chief Operating Officer – Retail Sales",
        linkedin: "https://www.linkedin.com/in/madhu-kuppani-13161535b/",
        photo: "/team/WhatsApp Image 2025-10-07 at 12.17.36 PM.jpeg",
      },
      {
        id: 5,
        name: "Saketh Addepalli",
        bio: "Chief Sales Officer – Institutional Sales with 9+ years in B2B, government, and key accounts. Delivered 100%+ YoY growth for three consecutive years, leading teams across trade and modern trade. PGDM (IIM Ranchi) and former student council president; blends strategy, execution, and relationship leadership to expand markets and elevate enterprise revenue outcomes.",
        designation: "Chief Sales Officer – Institutional Sales",
        linkedin: "https://www.linkedin.com/in/sakethaddepalli/",
        photo: "/team/Saketh.jpg",
      },

      // Vice Presidents
      {
        id: 6,
        name: "Mayuram Barooah",
        designation: "Vice President",
        bio: "Vice President – Sales & Marketing and 23+ years in government and corporate programs. Leads complex, multi-stakeholder initiatives in India and abroad, strengthening partnerships, planning, and governance. BE (Electronics), Nagpur University. PMI-certified. Trusted for high-impact delivery, strategic account growth, and disciplined execution across public and private sectors.",
        linkedin: "https://www.linkedin.com/in/mayuram-barooah-1b040a31/",
        photo: "/team/Mayuram%20Barooah.png",
      },
      {
        id: 7,
        name: "Venu Gopal",
        designation: "Vice President",
        bio: "Vice President – Sales & Marketing focused on enterprise growth and customer success. Builds pipelines, coaches teams, and aligns marketing with field execution. Strengths include solution selling, territory expansion, and partner enablement. Known for clear communication, accountability, and results-oriented leadership that converts opportunities into sustainable revenue and referenceable client relationships.",
        linkedin: "https://www.linkedin.com/in/venugopal-gonuguntla-37a20a58/",
        photo: "/team/Venu%20Gopal.png",
      },
      {
        id: 8,
        name: "Sandheep Kumar Akula",
        bio: "Vice President – Government Bodies. Passionate, results-driven, and highly organized leader with strong analytical and communication skills. Experienced in project coordination, client relations, and team management. Values integrity and adaptability. Excels at planning, execution, and cross-functional collaboration, embracing new technologies to deliver quality outcomes aligned with organizational goals.",
        designation: "Vice President – Government Bodies",
        photo: "/team/Sandeep.jpg",
        linkedin:"https://www.linkedin.com/in/sandheep-reddy-51431832a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },

      // Assistant Vice Presidents
      {
        id: 9,
        name: "Rajendra Patil",
        designation: "Assistant Vice President",
        bio: "Assistant Vice President – Institutional Sales with 28+ years across sales and marketing. Leads West Region sales for Brihaspathi Technologies. Trusted for account development, channel stewardship, and consistent delivery against targets. Builds relationships, resolves challenges quickly, and advances customer value with practical execution and commitment to long-term partnerships.",
        linkedin: "https://www.linkedin.com/in/rajendra-patil-9ba11716/",
        photo: "/team/Rajendra%20Photo.jpg",
      },
      {
        id: 10,
        name: "Sagar Ambadas",
        designation: "Assistant Vice President – Projects",
        bio: "Assistant Vice President – Projects with 20 years in planning and delivery. Crafts schedules, monitors milestones, and allocates manpower to ensure smooth implementation. Champions client coordination, progress reviews, and needs discovery. Mentors teams, boosts productivity, and drives operational excellence through process optimization, risk awareness, and proactive problem-solving.",
        linkedin: "https://www.linkedin.com/in/ambadas-sagar-b890a8175/",
        photo: "/team/Sagar%20Ambadas.png",
      },
      {
        id: 11,
        name: "Arvind Durgam",
        designation: "Assistant Vice President – Sales",
        bio: "Assistant Vice President – Sales with 25 years in CCTV and electronic security, including a decade across Smart & Safe City programs—ANPR and traffic-enforcement analytics. Blends solution expertise with field execution, supporting bids, deployments, and service quality. Committed to stakeholder alignment and dependable lifecycle performance.",
        linkedin: "https://www.linkedin.com/in/durgam-aravind-kumar-22229744/",
        photo: "/team/ARVIND%20DURGAM.png",
      },
       {
        id: 11,
        name: "Yeshwanth Reddy ",
        designation: "Assistant Vice President - New Product Development",
        bio: " bringing extensive leadership experience and a proven record in driving growth across technology and SaaS sectors. With expertise in end-to-end Product Development, Enterprise Solutions, and Business Strategy, he has successfully led innovation and operations in dynamic markets. Formerly the Enterprise Product Head at Asianet Satellite Communication Limited (Jan ’24–Jan ’25), Yeshwanth played a key role in scaling product portfolios and networks. As the founder of Simply5 Inc. and OpenWiFi, he brings entrepreneurial vision and technical depth to his role, driving our company’s growth and industry leadership.",
        linkedin: "https://www.linkedin.com/in/theyeshreddy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        photo: "/team/me.jpg",
      },

      // General Managers
      {
        id: 12,
        name: "Ramasastrulu T",
        designation: "General Manager",
        bio: "General Manager with 13+ years in solar energy. Specializes in tendering, operations, procurement, and government coordination. Leads installations with quality, compliance, and on-time delivery. Applies technical depth and project discipline to scale renewable initiatives, optimize costs, and sustain performance—strengthening the company’s clean-energy role and operational excellence.",
        linkedin: "https://www.linkedin.com/in/ramu-tata-55157782/",
        photo: "/team/Ramu.png",
      },
      {
        id: 13,
        name: "G.Ganeshwar ",
        designation: "General Manager -New product development and solutions ",
        bio: "General Manager – Projects leading Software and New Product Innovations. With 12+ years across AI video analytics, IoT, smart infrastructure, and solar systems, he drives R&D from concept to scale. Partners with public safety, defense, education, and transport, turning ideas into practical technologies for safer, smarter communities.",
        photo: "/team/Ganesh Headshot.png",
        linkedin:
          "https://www.linkedin.com/in/s-v-ganeswara-swamy-gunisetty-74453816a/",
      },
      {
        id: 14,
        name: " KKNS Prasad",
        designation: "General Manager – projects ",
        bio: "General Manager – Projects with 10+ years managing large, multi-disciplinary deliveries. Aligns scope, schedule, and cost to strategic objectives while fostering collaboration and continuous improvement. Prioritizes innovation, sustainability, and risk control. Builds strong client relationships, ensuring transparent governance and dependable, quality outcomes with long-term value.",
        linkedin: "https://www.linkedin.com/in/kkns-prasad-617016102/",
        photo: "/team/Prasad%20-%20General%20Manager.jpg",
      },
      {
        id: 15,
        name: "Kiran Sanaboina",
        designation: "General Manager – Technical Support",
        linkedin: "https://www.linkedin.com/in/kiransanaboina/",
        bio: "General Manager – Technical Support with 15+ years designing, deploying, and managing integrated electronic security. Expertise covers CCTV, access control, intrusion, fire alarms, and AI-enabled platforms. Leads cross-functional teams through full lifecycles, emphasizing scalability, reliability, and compliance to create safer, smarter environments for enterprises and critical facilities.",
        photo: "/team/Kiran%20-%20General%20Manager.jpg",
      },
      {
        id: 16,
        name: "Ponugoti Moses ",
        designation: "General Manager – Sales",
        bio: "General Manager – Sales with eight years advancing ELV and Solar growth. Expands market reach, shapes go-to-market, and aligns sales and marketing with client goals. Recognized for relationship building, sustainable solutions, and predictable execution that converts demand into long-term partnerships across technology and energy sectors.",
        linkedin: "https://www.linkedin.com/in/moses-ponugoti-575666190/",
        photo: "/team/WhatsApp Image 2025-10-07 at 11.44.22 AM (1).jpeg",
      },

      // Functional Heads / Controllers
      {
        id: 17,
        name: "Sasank",
        designation: "Financial Controller",
        bio: "Financial Controller and Chartered Accountant with 12+ years across FP&A, audit, taxation, risk, and corporate finance. Optimizes cash flow, strengthens controls, and improves profitability through data-driven decisions. Ensures compliance while guiding planning, budgeting, and governance—enabling sustainable growth, transparency, and disciplined financial stewardship company-wide.",
        linkedin: "https://www.linkedin.com/in/ca-sasank-battu/",
        photo: "/team/Sasank.jpg",
      },
      {
        id: 18,
        name: "Reshal Melkar",
        designation: "HR Manager (HR & Admin)",
        bio: "HR leader with 10+ years managing end-to-end HR operations. Streamlines processes, strengthens compliance, and champions engagement. Aligns people strategy with business priorities to support growth and culture. Skilled across talent, performance, and HRMS, fostering trust, clarity, and continuous improvement to empower teams and improve outcomes.",
        linkedin: "https://www.linkedin.com/in/reshal-melkar-89257a128/",
        photo: "/team/Reshal%20-%20Hr%20manager.jpg",
      },
      {
        id: 28,
        name: "Manisha Shadangi",
        designation: "Manager CS & Legal",
        bio: " Governance and Compliance Professional with over 8.5 years of experience in corporate finance, legal and secretarial functions, fund-raising, and regulatory compliance. She has played a pivotal role in driving IPO readiness, mergers and acquisitions, and private equity and structured funding initiatives exceeding ₹800 crores. Her expertise spans corporate governance, NCD issuance, due diligence, ESG and CSR reporting, and stakeholder management. With a strong background in managing complex regulatory frameworks and strategic decision-making, she brings a results-driven approach to fostering financial discipline, governance excellence, and sustainable growth. Known for her analytical, leadership, and collaborative skills, she ensures transparency, compliance, and value creation across all organizational levels.",
        linkedin: "www.linkedin.com/in/manishashadangi",
        photo: "/team/WhatsApp Image 2025-10-14 at 11.35.20 AM.jpeg",
      },

      // Managers
      {
        id: 19,
        name: "Vikrant Singh",
        designation: "Brand Manager",
        bio: "With over a decade of experience in building and positioning brands, I lead the Brand & marketing vision at BTL as Brand Manager. Passionate about driving business growth through creativity and strategy, I specialize in digital marketing, brand storytelling, and audience engagement. Having completed an Executive Program in Digital Marketing, I blend data-driven insights with innovative campaigns to strengthen market presence and customer trust. My focus is on aligning marketing strategies with business goals to enhance brand value and drive long-term success in an evolving industry landscape",
        linkedin: "https://www.linkedin.com/in/vikrant-singh-parihar/",
        photo: "/team/Vikranth%20-%20Brand%20Manager.jpg",
      },
      {
        id: 20,
        name: " Sukesh kapparath",
        designation: "Accounts Manager",
        bio: "Accounts Manager with 14+ years in accounting and financial management. Leads teams, payroll, compliance, reporting, and audits. Skilled in Tally, SAP Business One, and Office 365. Known for analysis, reconciliation, and process optimization—ensuring regulatory accuracy and operational excellence to support growth with reliable, timely financial operations.",
        photo: "/team/Sukesh - Accounts Manager.jpg",
        linkedin:"https://in.linkedin.com/in/sukesh-kapparath-1b223653"
      },
      {
        id: 21,
        name: "Budida Rambabu",
        designation: "Accounts Manager",
        bio: "Accounts Manager with 12+ years in general accounting and financial management, MBA (Finance). Experienced in reporting, budgeting, and compliance. Streamlines operations, improves accuracy, and supports audits. Builds collaborative stakeholder relationships, delivering timely, transparent information that informs decisions and strengthens governance and fiscal performance.",
        linkedin: "https://www.linkedin.com/in/ram-babu-44a57a72/",
        photo: "/team/Accounts%20team%20photo%20Rambabu.png",
      },
      {
        id: 22,
        name: "Ashish Bandabuche",
        designation: "Senior Purchase Manager",
        bio: "Senior Purchase Manager optimizing procurement strategy, sourcing, and vendor performance. Negotiates value, quality, and timelines while managing risk and compliance. Collaborates with engineering and finance to balance cost, availability, and specifications. Implements process discipline and analytics that improve continuity, reduce total cost, and support reliable project delivery.",
        photo: "/team/Ashish%20Bandabuche%20-%20Sr.%20Purchase%20Manager.png",
      },

      // Key Accounts Managers
      {
        id: 23,
        name: "Dikkala Srija",
        photo: "/team/WhatsApp Image 2025-10-07 at 11.44.22 AM (2).jpeg",
        designation: "Key Accounts Manager",
        bio: "Key Accounts Manager energized by meeting people and learning diverse perspectives. Turns challenges into opportunities, bringing creativity and momentum to deliver value. Builds relationships, coordinates solutions, and follows through with care—focused on positive impact, dependable execution, and growth aligned with client success.",
        linkedin: "https://www.linkedin.com/in/srija-dikkala-623a2b19b/",
      },
      {
        id: 24,
        name: "Majjari Hemanth",
        designation: "Key Accounts Manager",
        bio: "Key Accounts Manager leading institutional sales and government partnerships. Combines IIM Ranchi training with operational rigor to manage lifecycles, negotiations, and stakeholder alignment. Thrives in high-pressure environments, translating complex requirements into successful deployments and measurable outcomes.",
        linkedin: "https://www.linkedin.com/in/majjari-hemanth-015901183/",
        photo: "/team/Hemanth-Key Account Manager.png",
      },
      {
        id: 25,
        name: "Hazekaiah Graham Laloo",
        designation: "Key Accounts Manager",
        bio: "Key Accounts Manager overseeing key relationships, operations, and administration. MBA (Marketing), IIM Ranchi. Applies strategy, data-driven insight, and cross-functional leadership to optimize execution. Skilled in stakeholder engagement, process improvement, and financial analysis—delivering effective solutions and long-term business performance.",
        photo: "/team/Jack-Key Account Manager.jpg",
        linkedin: "https://www.linkedin.com/in/hazekaiah-laloo-782218200/",
      },
      {
        id: 26,
        name: "Arvind Kumar Dongre",
        photo: "/team/WhatsApp Image 2025-10-07 at 11.44.22 AM.jpeg",
        designation: "Key Accounts Manager",
        bio: "Key Accounts Manager with interests spanning marketing, strategy, information technology, public speaking, and literature. JRF awardee; MA in Public Administration and B.Com. Applies structured thinking and communication to align stakeholders, clarify value, and support execution—converting opportunity into measurable impact and durable relationships.",
        linkedin: "https://www.linkedin.com/in/arvind-kumar-dongre-88bb6a187/",
      },
      {
        id: 27,
        name: "Praveen Malothu",
        designation: "Key Accounts Manager",
        bio: "Key Accounts Manager leading institutional sales and long-term partnerships. Experienced across sales, distribution, and execution in FMCG and technology. Solves pragmatically, collaborates with stakeholders, and tailors solutions to client needs. Committed to growth, trust, and efficiency—turning interactions into learning that strengthens outcomes and organizational success.",
        linkedin:
          "https://www.linkedin.com/in/praveen-malothu-bb380b1bb/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        photo: "/team/Praveen.jpg",
      },
    ],
  },
];

/* =========================
   Scroll direction hook
========================= */
function useScrollDirection() {
  const [dir, setDir] = useState("down");
  const lastY = useRef(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          setDir((prev) =>
            y > lastY.current ? "down" : y < lastY.current ? "up" : prev
          );
          lastY.current = y;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return dir;
}

function useColumnVariants() {
  const dir = useScrollDirection();
  return useMemo(
    () => ({
      hidden: { opacity: 0, y: dir === "down" ? 24 : -24, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.6 },
      },
      exit: {
        opacity: 0,
        y: dir === "down" ? -16 : 16,
        filter: "blur(6px)",
        transition: { duration: 0.2 },
      },
    }),
    [dir]
  );
}

/* =========================
   Card Component
========================= */
function TeamCard({ p }) {
  const coverSrc = p.photo || initialsAvatar(p.name);
  return (
    <div className="team-card">
      {/* Uniform image section */}
      <div className="team-card__media">
        <Image
          src={coverSrc}
          alt={p.name}
          preview={{ mask: "View photo" }}
          className="team-card__img"
        />
      </div>

      {/* Content */}
      <div className="team-card__body" style={{ minHeight: PANEL_HEIGHT }}>
        {/* Name + LinkedIn */}
        <div className="team-card__header font-sans font-extrabold">
          <Title level={3} style={{ margin: 0, color: BRAND }}>
            {p.name}
          </Title>

          {p.linkedin && (
            <a
              href={p.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn profile of ${p.name}`}
              className=""
            >
              <img
                src={LINKEDIN_IMG}
                alt="LinkedIn"
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </a>
          )}
        </div>

        {/* Designation */}
        <Text
          type="secondary"
          style={{ display: "block", marginTop: 8, fontSize: 16 }}
        >
          {p.designation}
        </Text>

        {/* Department / Location (optional) */}
        {(p.department || p.location) && (
          <Space
            size={8}
            style={{ marginTop: 10, display: "flex", flexWrap: "wrap" }}
          >
            {p.department && (
              <Tag className="ltwp__chip">
                <Users size={14} color={BRAND} />
                {p.department}
              </Tag>
            )}
            {p.location && (
              <Tag className="ltwp__chip">
                <MapPin size={14} color={BRAND} />
                {p.location}
              </Tag>
            )}
          </Space>
        )}

        {/* Bio */}
        <Paragraph className="team-card__bio">
          {p.bio || "Bio coming soon."}
        </Paragraph>
      </div>
    </div>
  );
}

/* =========================
   Main Component
========================= */
export default function LeadershipTeamWithPreview({ groups }) {
  const data = groups || ORG_GROUPS;
  const prefersReduced = useReducedMotion();
  const variants = useColumnVariants();

  return (
    <MotionConfig
      reducedMotion={prefersReduced ? "always" : "never"}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <section className="ltwp__container">
        {data.map((group) => (
          <div key={group.id} style={{ marginBottom: 56 }}>
            <Title level={2} style={{ marginBottom: 24, color: BRAND }}>
              {group.title}
            </Title>

            <Image.PreviewGroup>
              <Row gutter={GRID_GUTTER}>
                {group.people.map((p, idx) => (
                  <Col key={p.id} xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        ...variants.visible.transition,
                        delay: (idx % 8) * 0.04,
                      }}
                      style={{ willChange: "transform, opacity, filter" }}
                    >
                      <TeamCard p={p} />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
          </div>
        ))}
      </section>

      {/* Styles */}
      <style>{`
        .ltwp__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 12px;
        }

        .team-card {
          background: #fff;
          border-radius: ${CARD_RADIUS}px;
          overflow: hidden;
          box-shadow: ${CARD_SHADOW};
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .team-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.1);
        }

        .team-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          background: #f9fafb;
        }
        .team-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-card__body {
          padding: 16px;
        }

        .team-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .ltwp__lnk {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background-color: ${BRAND};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .ltwp__lnk:hover {
          transform: translateY(-1px) scale(1.05);
        }

        .ltwp__chip {
          background: rgba(7,81,138,0.08);
          color: ${BRAND};
          border: none;
          border-radius: 999px;
          padding: 2px 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .team-card__bio {
          margin-top: 12px !important;
          color: rgba(0,0,0,0.85);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </MotionConfig>
  );
}
