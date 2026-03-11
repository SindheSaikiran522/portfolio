import { motion } from "framer-motion";
import { Card, SectionHeading } from "@/components/ui/design-system";
import { MapPin, Mail, GraduationCap, Code2, BrainCircuit, Github, Linkedin, FileDown } from "lucide-react";
import { useGetProfile } from "@workspace/api-client-react";

export function Profile() {
  const { data: profile } = useGetProfile();

  const name = profile?.name ?? "Sinde Saikiran";
  const role = profile?.role ?? "Computer Science Student";
  const location = profile?.location ?? "India";
  const email = profile?.email ?? "sindesaikiran@example.com";
  const bio = profile?.bio ?? "I am passionate about Artificial Intelligence, Machine Learning, and Full Stack Development. I enjoy building intelligent systems and scalable applications that solve real-world problems.";
  const githubUrl = profile?.githubUrl ?? "https://github.com/SindeSaikiran";
  const linkedinUrl = profile?.linkedinUrl ?? "#";
  const resumeUrl = profile?.resumeUrl ?? "#";

  return (
    <section id="profile" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Who I am and what drives my passion for technology.">
          Operator Profile
        </SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-8 md:p-12 overflow-visible">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white/10 shadow-[0_0_30px_hsl(var(--primary)/0.3)] z-10 relative group">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity z-20" />
                  <img 
                    src={`${import.meta.env.BASE_URL}images/avatar.png`} 
                    alt={`${name} Avatar`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl -z-10 rounded-full" />
              </div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-display font-bold mb-2">{name}</h3>
                <p className="text-primary font-display tracking-widest uppercase mb-6 flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="w-5 h-5" /> {role}
                </p>
                
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                  {bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground glass-panel p-4 rounded-xl">
                    <MapPin className="text-secondary w-5 h-5 shrink-0" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground glass-panel p-4 rounded-xl">
                    <Mail className="text-secondary w-5 h-5 shrink-0" />
                    <span className="truncate">{email}</span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-sm text-muted-foreground hover:text-secondary hover:border-secondary/40 transition-all"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-sm text-muted-foreground hover:text-green-400 hover:border-green-400/40 transition-all"
                  >
                    <FileDown className="w-4 h-4" /> Resume
                  </a>
                </div>

                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary">
                      <Code2 />
                    </div>
                    <span className="text-xs font-display text-muted-foreground">Full Stack</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-secondary">
                      <BrainCircuit />
                    </div>
                    <span className="text-xs font-display text-muted-foreground">AI / ML</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
