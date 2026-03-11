import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { profileTable } from "@workspace/db";
import { UpdateProfileBody, AdminLoginBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sinde@admin2024";

const defaultProfile = {
  name: "Sinde Saikiran",
  role: "Computer Science Student",
  location: "India",
  email: "sindesaikiran@example.com",
  bio: "I am passionate about Artificial Intelligence, Machine Learning, and Full Stack Development. I enjoy building intelligent systems and scalable applications that solve real-world problems.",
  githubUrl: "https://github.com/SindeSaikiran",
  linkedinUrl: "https://linkedin.com/in/sindesaikiran",
  resumeUrl: "#",
  tagline: "Specializing in building intelligent systems, seamless user experiences, and scalable architectures.",
  githubUsername: "SindeSaikiran",
};

async function getOrCreateProfile() {
  const rows = await db.select().from(profileTable).limit(1);
  if (rows.length > 0) return rows[0];
  const inserted = await db.insert(profileTable).values(defaultProfile).returning();
  return inserted[0];
}

router.get("/profile", async (_req, res) => {
  const profile = await getOrCreateProfile();
  res.json({
    name: profile.name,
    role: profile.role,
    location: profile.location,
    email: profile.email,
    bio: profile.bio,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    resumeUrl: profile.resumeUrl,
    tagline: profile.tagline,
    githubUsername: profile.githubUsername,
  });
});

router.put("/profile", async (req, res) => {
  const parsed = UpdateProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input." });
    return;
  }

  if (parsed.data.adminPassword !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Incorrect admin password." });
    return;
  }

  const { adminPassword: _pw, ...fields } = parsed.data;

  const profile = await getOrCreateProfile();
  const updated = await db
    .update(profileTable)
    .set({ ...fields, updatedAt: new Date() })
    .where(eq(profileTable.id, profile.id))
    .returning();

  const p = updated[0];
  res.json({
    name: p.name,
    role: p.role,
    location: p.location,
    email: p.email,
    bio: p.bio,
    githubUrl: p.githubUrl,
    linkedinUrl: p.linkedinUrl,
    resumeUrl: p.resumeUrl,
    tagline: p.tagline,
    githubUsername: p.githubUsername,
  });
});

router.post("/admin/login", (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input." });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }
  res.json({ success: true, message: "Access granted." });
});

export default router;
