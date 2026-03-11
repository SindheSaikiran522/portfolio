import { motion } from "framer-motion";
import { Card, SectionHeading } from "@/components/ui/design-system";
import { useGetSkills } from "@workspace/api-client-react";
import { Layers, Database, Code, Cpu, Loader2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="w-8 h-8 text-primary" />,
  "Frameworks": <Layers className="w-8 h-8 text-secondary" />,
  "Databases": <Database className="w-8 h-8 text-accent" />,
  "Tools": <Cpu className="w-8 h-8 text-primary" />
};

export function Skills() {
  const { data, isLoading, isError } = useGetSkills();

  return (
    <section id="skills" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="My technical arsenal and core competencies.">
          Skill Matrix
        </SectionHeading>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive py-10">Failed to load skills data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.categories.map((cat, index) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl">
                    {iconMap[cat.category] || <Code className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {cat.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-body text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
