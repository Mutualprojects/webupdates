import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function Terms() {
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
          Terms and Conditions
        </Title>

        {/* =========================
            INTRODUCTION
        ========================== */}
        <Paragraph className="text-lg leading-relaxed text-justify text-gray-700">
          Welcome to{" "}
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>
          . By accessing or using our website, products, or services, you agree
          to the following Terms and Conditions. Please read them carefully as
          they govern your access, use, and interaction with all our offerings.
        </Paragraph>

        <Divider />

        {/* =========================
            ELIGIBILITY
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Eligibility
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Use of our services is permitted only to individuals and entities who
          can form legally binding contracts under applicable laws. By engaging
          with our platform, you represent that you meet all eligibility
          criteria and agree to abide by these Terms.
        </Paragraph>

        {/* =========================
            SERVICE USAGE
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Service Usage
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>{" "}
          provides IT solutions, software applications, electronic security
          systems, automation products, and associated services. Your use of
          these offerings is subject to applicable licenses, service-level
          agreements, and contractual obligations shared at the time of
          engagement.
        </Paragraph>

        {/* =========================
            ACCOUNT RESPONSIBILITY
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Account Responsibility
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Users are responsible for maintaining the confidentiality of account
          credentials and any activities performed under their login. All
          actions taken using your credentials are deemed to be your
          responsibility unless promptly reported in writing.{" "}
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>{" "}
          shall not be held liable for unauthorized access resulting from
          negligence or misuse.
        </Paragraph>

        {/* =========================
            PROHIBITED ACTIVITIES
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Prohibited Activities
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Users agree not to engage in activities that violate laws, infringe on
          intellectual property, or disrupt service operations. The following
          actions are strictly prohibited:
        </Paragraph>
        <ul className="list-disc pl-8 space-y-2 text-[16px] text-gray-700">
          <li>
            Unauthorized reproduction, copying, or redistribution of our
            software, content, or proprietary designs.
          </li>
          <li>
            Reverse engineering, modification, or tampering with proprietary
            technologies without prior written approval.
          </li>
          <li>
            Engaging in fraudulent, abusive, or malicious conduct that may harm
            other users or affect the security and integrity of our systems.
          </li>
        </ul>

        {/* =========================
            FEES AND PAYMENTS
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Fees and Payments
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          Fees and payment terms are defined within quotations, invoices, or
          service agreements. Payments must be made according to the mutually
          agreed schedule. Delays or incomplete transactions may lead to
          suspension of services, additional charges, or termination as per
          policy.
        </Paragraph>

        {/* =========================
            DISCLAIMER
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Disclaimer
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          While{" "}
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>{" "}
          strives to ensure accuracy, reliability, and availability of its
          content and services, we do not warrant completeness, timeliness, or
          uninterrupted functionality. All materials and offerings are provided
          “as is” and “as available,” and use of the Service is entirely at your
          own risk.
        </Paragraph>

        {/* =========================
            LIMITATION OF LIABILITY
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Limitation of Liability
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          In no event shall{" "}
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>
          , its directors, employees, or affiliates be liable for any direct,
          indirect, incidental, consequential, or special damages arising out of
          or in connection with the use or inability to use our website,
          software, or services. This includes but is not limited to loss of
          profits, data, or business continuity.
        </Paragraph>

        {/* =========================
            CHANGES TO TERMS
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Changes to Terms
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          We reserve the right to modify or update these Terms and Conditions at
          any time without prior notice. Updates become effective upon
          publication on this page. Continued use of our services constitutes
          acceptance of the revised Terms.
        </Paragraph>

        {/* =========================
            GOVERNING LAW
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Governing Law and Jurisdiction
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          These Terms and all related matters shall be governed by the laws of{" "}
          <span className="text-[#07518a] font-medium">Telangana, India</span>.
          All disputes shall fall under the exclusive jurisdiction of courts
          located in{" "}
          <span className="text-[#07518a] font-medium">
            Hyderabad, Telangana
          </span>
          .
        </Paragraph>

        {/* =========================
            RELATED POLICIES
        ========================== */}
        <Title
          level={2}
          className="!text-[#07518a] !font-sans !text-2xl md:!text-3xl mt-12 mb-4"
        >
          Related Policies
        </Title>
        <Paragraph className="text-gray-700 text-justify leading-relaxed">
          For more information about our data handling and privacy practices,
          please refer to our{" "}
          <a
            href="/privacy-&-policy"
            className="text-[#0a6ab8] underline hover:text-[#07518a]"
          >
            Privacy Policy
          </a>{" "}
          and other supporting documentation available on our website.
        </Paragraph>

        <Divider />

        {/* =========================
            CLOSING NOTE
        ========================== */}
        <Paragraph className="text-lg leading-relaxed mt-10 text-gray-700 text-justify">
          Thank you for choosing{" "}
          <span className="text-[#07518a] font-medium">
            Brihaspathi Technologies
          </span>
          . Your continued trust inspires our commitment to innovation,
          transparency, and service excellence.
        </Paragraph>
      </div>
    </div>
  );
}
