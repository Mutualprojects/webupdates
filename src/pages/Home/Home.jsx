// src/pages/Home.jsx
import React, { useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import SolutionsSection from "../../components/SolutionsSection";
import Testimonials from "../../components/Testimonials";
import WhyMinimalZigZagInteractive from "../../components/WhyMinimalZigZagInteractive";
import Weserve from "../../components/Weserve";
import ClientsMarqueeHero from "../../components/ClientsMarqueeHero";
import Certifications from "../../components/Certifications";

function Home() {
  // Ensure horizontal scroll is disabled at the document level too
  useEffect(() => {
    const prev = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";
    // Some browsers consider body overflow as well:
    const prevBody = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.overflowX = prev || "";
      document.body.style.overflowX = prevBody || "";
    };
  }, []);

  return (
    // Tailwind: hide any horizontal overflow at the page wrapper
    <div className="overflow-x-hidden">
      <HeroSection />
      <SolutionsSection />
      <Testimonials />
      <WhyMinimalZigZagInteractive />
      <Weserve />
      <ClientsMarqueeHero />

      <div className="p-6 content-center">
        <div>
          <h1 className="text-center font-extrabold font-sans text-5xl">
            Certifications &amp; Empanelments
          </h1>
          <Certifications marquee rows={2} pps={60} sizePx={80} gapPx={40} />
        </div>
      </div>
    </div>
  );
}

export default Home;
