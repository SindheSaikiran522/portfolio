import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Sinde Saikiran"),
  role: text("role").notNull().default("Computer Science Student"),
  location: text("location").notNull().default("India"),
  email: text("email").notNull().default("sindesaikiran@example.com"),
  bio: text("bio").notNull().default(
    "I am passionate about Artificial Intelligence, Machine Learning, and Full Stack Development. I enjoy building intelligent systems and scalable applications that solve real-world problems."
  ),
  githubUrl: text("github_url").notNull().default("https://github.com/SindeSaikiran"),
  linkedinUrl: text("linkedin_url").notNull().default("https://linkedin.com/in/sindesaikiran"),
  resumeUrl: text("resume_url").notNull().default("#"),
  tagline: text("tagline").notNull().default(
    "Specializing in building intelligent systems, seamless user experiences, and scalable architectures."
  ),
  githubUsername: text("github_username").notNull().default("SindeSaikiran"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Profile = typeof profileTable.$inferSelect;
