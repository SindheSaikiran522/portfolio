import { StarsBackground } from "@/components/layout/StarsBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { StatsAchievements } from "@/components/sections/StatsAchievements";
import { Contact } from "@/components/sections/Contact";
import { Chatbot } from "@/components/layout/Chatbot";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white">
      <StarsBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Projects />
        <StatsAchievements />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
