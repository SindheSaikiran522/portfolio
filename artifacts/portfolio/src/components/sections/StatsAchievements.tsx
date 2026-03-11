import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/design-system";
import { Trophy, Target, Star } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "AI Agriculture Hackathon",
    desc: "Participated and built an innovative React Native mobile application integrating ML for crop prediction.",
    icon: <Trophy className="text-yellow-500 w-6 h-6" />
  },
  {
    title: "Machine Learning Experience",
    desc: "Developed several predictive models including Air Pollution monitoring and Rock Paper Scissors AI with 60%+ win rate.",
    icon: <Target className="text-primary w-6 h-6" />
  },
  {
    title: "Full-Stack System Deployment",
    desc: "Successfully built and deployed end-to-end MERN stack applications with functional REST APIs and database modeling.",
    icon: <Star className="text-secondary w-6 h-6" />
  }
];

export function StatsAchievements() {
  return (
    <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Metrics and milestones of my journey.">
          Stats & Milestones
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <h3 className="font-display text-2xl font-bold tracking-widest text-center text-primary mb-2">GitHub Activity</h3>
            
            {/* Real github stats from SindeSaikiran */}
            <div className="glass-panel p-4 rounded-2xl w-full max-w-md mx-auto hover:-translate-y-2 transition-transform duration-300">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=SindeSaikiran&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117" 
                alt="GitHub Stats" 
                className="w-full rounded-xl"
              />
            </div>
            
            <div className="glass-panel p-4 rounded-2xl w-full max-w-md mx-auto hover:-translate-y-2 transition-transform duration-300">
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=SindeSaikiran&layout=compact&theme=radical&hide_border=true&bg_color=0D1117" 
                alt="Top Languages" 
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>

          {/* Achievements Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold tracking-widest text-secondary mb-8">Achievements</h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.35rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
              {ACHIEVEMENTS.map((ach, i) => (
                <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-card text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
                    {ach.icon}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl group-hover:border-primary/50 transition-colors duration-300">
                    <h4 className="font-display font-bold text-lg mb-2 text-white">{ach.title}</h4>
                    <p className="text-muted-foreground text-sm font-body">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
