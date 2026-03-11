import { motion } from "framer-motion";
import { Card, SectionHeading, Button } from "@/components/ui/design-system";
import { useGetProjects } from "@workspace/api-client-react";
import { ExternalLink, Github, Loader2 } from "lucide-react";

export function Projects() {
  const { data, isLoading, isError } = useGetProjects();

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Showcasing my journey through code and intelligent systems.">
          Featured Projects
        </SectionHeading>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive py-10">Failed to load projects data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col p-0 overflow-hidden group">
                  {/* Project Image Placeholder */}
                  <div className="h-48 w-full bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-duration-500 z-10" />
                    {/* Using a tech patterned stock image representing projects since API URL might be placeholder */}
                    <img 
                      src={project.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
                      }}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-6 flex-1 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-display tracking-wider uppercase text-secondary bg-secondary/10 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full text-sm py-2">
                          <Github className="w-4 h-4" /> Repo
                        </Button>
                      </a>
                      <Button variant="ghost" className="px-3" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
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
