import CTA from "./src/cta";
import EntryLevelFeature from "./src/entry_level_features";
import FAQ from "./src/FAQ";
import Features from "./src/features";
import Footer from "./src/footer";
import Hero from "./src/hero";
import Navbar from "./src/navbar";
import Pricing from "./src/pricing";
import Stats from "./src/stats";
import Working from "./src/working";

export default function Landing() {
  return (
    <>
      <div className="relative w-full min-h-screen bg-[#0c0c0c] text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <Stats />
          <Working />
          <EntryLevelFeature />
          <Pricing />
          <FAQ/>
          <CTA/>
          <Footer/>
        </div>
      </div>
    </>
  );
}
