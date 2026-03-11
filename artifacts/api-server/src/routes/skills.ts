import { Router, type IRouter } from "express";

const router: IRouter = Router();

const skillsData = {
  categories: [
    {
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "Java"],
    },
    {
      category: "Frameworks",
      skills: ["React Native", "Node.js", "Express.js"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "SQLite"],
    },
    {
      category: "Tools & Technologies",
      skills: ["Git", "Firebase", "Expo", "REST APIs"],
    },
  ],
};

router.get("/skills", (_req, res) => {
  res.json(skillsData);
});

export default router;
