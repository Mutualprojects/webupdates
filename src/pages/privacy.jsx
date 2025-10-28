import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function Privacy() {
  return (
    <div className="w-full bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        {/* =========================
            PAGE HEADER
        ========================== */}
        <Title
          level={1}
          className="!text-center !font-sans !text-[#07518a] !text-3xl md:!text-5xl font-semibold mb-10"
        >
          Privacy Policy
        </Title>

        <Paragraph className="text-lg leading-relaxed text-justify text-gray-700">
          This Privacy Policy explains how we collect, use, and disclose your
          information when you use our Service, along with outlining your
          privacy rights and the protections provided by law.
        </Paragraph>

        <Paragraph className="text-lg leading-relaxed text-justify text-gray-700">
          We use your personal data to operate and enhance the Service. By
          accessing or using the Service, you consent to the collection and use
          of information in line with this Privacy Policy.
        </Paragraph>

        <Divider />

        {/* =========================
            INTERPRETATION
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Interpretation and Definitions
        </Title>

        <Title level={3} className="!text-[#0a6ab8] !font-sans !text-xl mt-8 mb-2">
          Interpretation
        </Title>
        <Paragraph className="text-justify text-gray-700 leading-relaxed">
          Words with capitalized initials carry specific definitions under the
          conditions given. The following terms hold the same meaning whether
          used in singular or plural form.
        </Paragraph>

        <Title level={3} className="!text-[#0a6ab8] !font-sans !text-xl mt-8 mb-2">
          Definitions
        </Title>
        <Paragraph className="text-justify text-gray-700 leading-relaxed">
          For the purposes of this Privacy Policy:
        </Paragraph>

        <ul className="list-disc pl-8 space-y-2 text-[16px] text-gray-700">
          <li>
            <span className="text-[#07518a]">Account:</span> A unique account
            created for you to access our Service or parts of it.
          </li>
          <li>
            <span className="text-[#07518a]">Affiliate:</span> An entity that
            controls, is controlled by, or is under common control with a party,
            where “control” signifies owning 50% or more of voting shares or
            comparable authority.
          </li>
          <li>
            <span className="text-[#07518a]">Company:</span> Refers to{" "}
            <span className="text-[#0a6ab8] font-medium">
              Brihaspathi Technologies Limited
            </span>
            , 501, #508–510, Shangrila Plaza, Road No. 2, Park View Enclave,
            Banjara Hills, Hyderabad, Telangana – 500034.
          </li>
          <li>
            <span className="text-[#07518a]">Cookies:</span> Small files placed
            on your device that store browsing details and preferences.
          </li>
          <li>
            <span className="text-[#07518a]">Country:</span> Refers to
            Telangana, India.
          </li>
          <li>
            <span className="text-[#07518a]">Device:</span> Any tool such as a
            computer, smartphone, or tablet used to access the Service.
          </li>
          <li>
            <span className="text-[#07518a]">Personal Data:</span> Information
            relating to an identified or identifiable individual.
          </li>
          <li>
            <span className="text-[#07518a]">Service:</span> Refers to the
            website.
          </li>
          <li>
            <span className="text-[#07518a]">Service Provider:</span> Any
            organization or person processing data for the Company.
          </li>
          <li>
            <span className="text-[#07518a]">Usage Data:</span> Automatically
            collected data such as device info, visit duration, or pages viewed.
          </li>
          <li>
            <span className="text-[#07518a]">Website:</span>{" "}
            <a
              href="https://brihaspathi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a6ab8] underline"
            >
              brihaspathi.com
            </a>
            .
          </li>
          <li>
            <span className="text-[#07518a]">You:</span> The person, company, or
            entity accessing or using the Service.
          </li>
        </ul>

        <Divider />

        {/* =========================
            DATA COLLECTION
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Collecting and Using Your Personal Data
        </Title>

        <Title level={3} className="!text-[#0a6ab8] !font-sans !text-xl mt-8 mb-2">
          Personal Data
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          When using our Service, we may ask you to provide identifiable details
          used to contact or identify you. These may include:
        </Paragraph>
        <ul className="list-disc pl-8 space-y-2 text-[16px] text-gray-700">
          <li>Email address</li>
          <li>First and last name</li>
          <li>Phone number</li>
          <li>Usage Data</li>
        </ul>

        <Title level={3} className="!text-[#0a6ab8] !font-sans !text-xl mt-8 mb-2">
          Usage Data
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Usage Data is automatically collected and may include your device’s
          IP address, browser type and version, pages visited, visit time,
          duration and other diagnostics.
        </Paragraph>

        <Title level={3} className="!text-[#0a6ab8] !font-sans !text-xl mt-8 mb-2">
          Tracking Technologies and Cookies
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          We use cookies and similar technologies to monitor activity and
          improve our Service.
        </Paragraph>

        <ul className="list-disc pl-8 space-y-2 text-[16px] text-gray-700">
          <li>
            <span className="text-[#07518a]">Browser Cookies:</span> You may
            refuse cookies via browser settings, but some features may not work.
          </li>
          <li>
            <span className="text-[#07518a]">Web Beacons:</span> Small
            electronic files used to count visitors or track engagement.
          </li>
        </ul>

        <Paragraph className="mt-4 text-gray-700">
          <span className="text-[#07518a] font-medium">Types of Cookies:</span>
        </Paragraph>
        <ol className="list-decimal pl-8 space-y-2 text-[16px] text-gray-700">
          <li>Essential Cookies (Session) – mandatory for core functions.</li>
          <li>Notice Acceptance Cookies – record your cookie consent.</li>
          <li>
            Functionality Cookies – remember your preferences for a personalized
            experience.
          </li>
        </ol>

        <Divider />

        {/* =========================
            DATA USAGE
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Use of Personal Data
        </Title>

        <ul className="list-disc pl-8 space-y-2 text-[16px] text-gray-700">
          <li>Provide, maintain, and improve the Service.</li>
          <li>Manage your account as a registered user.</li>
          <li>Fulfill contractual obligations.</li>
          <li>Communicate via email, phone, or app notifications.</li>
          <li>
            Offer updates, promotions, and related services (unless opted out).
          </li>
          <li>Handle your requests and inquiries.</li>
          <li>Analyze performance and monitor Service usage.</li>
        </ul>

        <Divider />

        {/* =========================
            RETENTION
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Retention, Transfer, and Deletion
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Personal Data is retained only as long as necessary or as required by
          law. Usage Data may be retained for shorter periods. Your data may be
          transferred across jurisdictions with appropriate safeguards.
        </Paragraph>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          You may request deletion of your data via your account settings or by
          contacting us directly. Certain information may be kept if legally
          required.
        </Paragraph>

        <Divider />

        {/* =========================
            DISCLOSURE
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Disclosure and Security
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Data may be disclosed during business transactions or to comply with
          legal obligations. While we take reasonable steps to secure your data,
          no system can guarantee 100% protection.
        </Paragraph>

        <Divider />

        {/* =========================
            CHILDREN
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Children’s Privacy
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          We do not knowingly collect data from individuals under 13. Parents or
          guardians should contact us if such data is shared, and it will be
          deleted promptly.
        </Paragraph>

        <Divider />

        {/* =========================
            THIRD-PARTY LINKS
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Third-Party Links
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Our Service may contain links to external websites. We advise you to
          review their privacy policies as we do not control or assume
          responsibility for them.
        </Paragraph>

        <Divider />

        {/* =========================
            UPDATES
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Updates to This Policy
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          We may update this Privacy Policy periodically. Updates will be posted
          here, and users will be notified before changes take effect.
        </Paragraph>

        <Divider />

        {/* =========================
            CONTACT
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Contact Us
        </Title>
        <Paragraph className="text-gray-700 leading-relaxed">
          For any questions or concerns regarding this Privacy Policy, contact
          us at:
        </Paragraph>
        <Paragraph className="text-[#0a6ab8] font-medium">
          Email:{" "}
          <a
            href="mailto:info@brihaspathi.com"
            className="underline text-[#0a6ab8]"
          >
            info@brihaspathi.com
          </a>
        </Paragraph>
      </div>
    </div>
  );
}
