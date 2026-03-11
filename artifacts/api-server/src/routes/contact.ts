import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { SubmitContactBody, ChatbotQueryBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input. Please check all fields." });
    return;
  }

  await db.insert(contactsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been received! I'll get back to you soon.",
  });
});

const chatbotKnowledge = `
You are an AI assistant on Sinde Saikiran's portfolio website. Answer questions about Sinde based on this information:

NAME: Sinde Saikiran
ROLE: Computer Science Student, Full Stack Developer, AI & ML Enthusiast
LOCATION: India

BIO: Passionate about Artificial Intelligence, Machine Learning, and Full Stack Development. Enjoys building intelligent systems and scalable applications that solve real-world problems.

SKILLS:
- Programming Languages: Python, JavaScript, Java
- Frameworks: React Native, Node.js, Express.js
- Databases: MongoDB, SQLite
- Tools: Git, Firebase, Expo, REST APIs

PROJECTS:
1. Intelligent Agent Job Search System - Python AI system that automatically finds relevant jobs
2. Air Pollution Prediction using Machine Learning - ML model predicting air pollution using historical datasets
3. AI Agriculture Mobile Application - React Native + Node.js + MongoDB app helping farmers decide planting time using climate data
4. Stock Price Checker - Full stack JavaScript application that fetches real-time stock prices
5. Rock Paper Scissors AI Bot - ML bot with over 60% win rate against other bots

CONTACT: Available via the contact form on this website. GitHub: github.com/SindeSaikiran. Location: India.

EXPERIENCE: Experience building Machine Learning projects, Full stack development, AI Agriculture Hackathon participation.

Reply in a friendly, professional tone. Keep answers concise. If asked something not in this knowledge base, say you don't have that specific information but direct them to the contact form.
`;

router.post("/chatbot", async (req, res) => {
  const parsed = ChatbotQueryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input." });
    return;
  }

  const userMessage = parsed.data.message.toLowerCase();
  let reply = "";

  if (userMessage.includes("skill") || userMessage.includes("know") || userMessage.includes("language") || userMessage.includes("tech")) {
    reply = "Sinde is proficient in Python, JavaScript, and Java. On the framework side, he works with React Native, Node.js, and Express.js. He uses MongoDB and SQLite for databases, and tools like Git, Firebase, Expo, and REST APIs in his projects.";
  } else if (userMessage.includes("project")) {
    reply = "Sinde has built 5 projects: an Intelligent Agent Job Search System, an Air Pollution Prediction ML model, an AI Agriculture Mobile App (React Native + MongoDB), a Stock Price Checker, and a Rock Paper Scissors AI Bot that wins 60%+ of matches!";
  } else if (userMessage.includes("contact") || userMessage.includes("email") || userMessage.includes("reach")) {
    reply = "You can reach Sinde via the Contact section of this portfolio! Just fill in your name, email, and message. You can also find him on GitHub at github.com/SindeSaikiran.";
  } else if (userMessage.includes("experience") || userMessage.includes("background") || userMessage.includes("about")) {
    reply = "Sinde Saikiran is a Computer Science student from India specializing in AI, Machine Learning, and Full Stack Development. He has experience with ML projects, full-stack apps, and participated in an AI Agriculture Hackathon.";
  } else if (userMessage.includes("location") || userMessage.includes("where") || userMessage.includes("india")) {
    reply = "Sinde is based in India, pursuing Computer Science with a focus on AI and Full Stack Development.";
  } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
    reply = "Hi there! I'm Sinde's portfolio assistant. I can tell you about his skills, projects, experience, and how to get in touch. What would you like to know?";
  } else if (userMessage.includes("github")) {
    reply = "You can find Sinde's code on GitHub at github.com/SindeSaikiran. Check out his projects including the AI Agriculture App, ML pollution predictor, and more!";
  } else {
    reply = "I'm Sinde's portfolio assistant! I can tell you about his skills (Python, JS, ML, React Native), his projects (AI job search, agriculture app, pollution predictor), or how to contact him. What would you like to know?";
  }

  res.json({ reply });
});

export default router;
