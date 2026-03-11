import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/design-system";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { useGetProfile } from "@workspace/api-client-react";

const ROLES = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Computer Science Student",
  "Problem Solver"
];

export function Hero() {
  const { text, isBlinking } = useTypingEffect(ROLES, 80, 40, 2000);
  const { data: profile } = useGetProfile();

  const name = profile?.name ?? "Sinde Saikiran";
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  const tagline = profile?.tagline ?? "Specializing in building intelligent systems, seamless user experiences, and scalable architectures.";
  const githubUrl = profile?.githubUrl ?? "https://github.com/SindeSaikiran";
  const linkedinUrl = profile?.linkedinUrl ?? "#";
  const resumeUrl = profile?.resumeUrl ?? "#";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-primary/30 text-primary mb-6 text-sm font-display tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>Hello World, I am</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display mb-6 leading-tight">
              {firstName} {lastName && <><br /><span className="text-gradient">{lastName}</span></>}
              {!lastName && <span className="text-gradient">{firstName}</span>}
            </h1>
            
            <div className="h-12 mb-8">
              <h2 className="text-2xl sm:text-3xl text-muted-foreground font-body">
                <span>{text}</span>
                <span className={`${isBlinking ? "opacity-100" : "opacity-0"} text-primary ml-1 transition-opacity`}>|</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-xl mb-10 font-body leading-relaxed">
              {tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#projects">
                <Button variant="primary">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline">
                  Resume <Download className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="flex gap-6 items-center">
              <p className="text-sm font-display text-muted-foreground uppercase tracking-widest">Connect :</p>
              <div className="h-px w-12 bg-white/20" />
              <a href={githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-secondary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-[100px] opacity-30 animate-pulse" />
              <div className="absolute inset-4 rounded-full glass-panel border border-white/20 shadow-[0_0_50px_hsl(var(--primary)/0.2)] flex items-center justify-center overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}images/space-bg.png`} 
                  alt="Deep Space" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <h3 className="absolute font-display text-4xl font-black text-white/50 tracking-[0.5em] text-glow">INNOVATE</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
