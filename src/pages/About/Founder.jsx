import React from "react";
import Hero from "../../components/Hero";
import MDLeadershipCard from "../../components/MDLeadershipCard";
import ForumsMembershipSection from "../../components/ForumsMembershipSection";
import AwardsSection from "../../components/AwardsSection";

export default function DirectorPage() {
  const data = {
    name: "Rajasekhar Papolu",
    title: "Managing Director | Technology Innovator | Business Leader",
    company: "Brihaspathi Technologies Limited",
  };

  return (
    <main className="w-full overflow-x-hidden selection:bg-[rgba(7,81,138,0.15)] selection:text-slate-900">
      <Hero data={data} />
      <MDLeadershipCard />
      <ForumsMembershipSection />
      <AwardsSection />
    </main>
  );
}
