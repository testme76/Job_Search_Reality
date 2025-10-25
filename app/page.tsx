import Nav from "@/components/Nav";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import SurveyCallout from "@/components/SurveyCallout";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Nav />

      {/* Main content - full width */}
      <div>
        <Hero />
        <Stats />
        <CTA />
      </div>

      {/* Floating sidebar - only on large screens */}
      <aside className="hidden xl:block fixed top-24 right-8 w-80 z-40">
        <SurveyCallout />
      </aside>

      {/* Mobile/Tablet survey section */}
      <div className="xl:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SurveyCallout />
      </div>
    </main>
  );
}
