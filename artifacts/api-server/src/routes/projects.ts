import { Router, type IRouter } from "express";

const router: IRouter = Router();

const projects = [
  {
    id: 1,
    title: "Intelligent Agent Job Search System",
    description:
      "A Python-based AI system that automatically searches and matches relevant job listings based on user profiles. Uses NLP and intelligent filtering to rank job opportunities by relevance.",
    techStack: ["Python", "AI", "NLP", "Web Scraping", "Machine Learning"],
    githubUrl: "https://github.com/SindeSaikiran",
    imageUrl: "",
  },
  {
    id: 2,
    title: "Air Pollution Prediction using Machine Learning",
    description:
      "A machine learning model that predicts air quality and pollution levels using historical environmental datasets. Implements regression and time-series forecasting for accurate predictions.",
    techStack: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/SindeSaikiran",
    imageUrl: "",
  },
  {
    id: 3,
    title: "AI Agriculture Mobile Application",
    description:
      "A React Native mobile app powered by Node.js and MongoDB that helps farmers make data-driven decisions about planting time using climate data and AI recommendations.",
    techStack: ["React Native", "Node.js", "MongoDB", "Express.js", "AI", "Expo"],
    githubUrl: "https://github.com/SindeSaikiran",
    imageUrl: "",
  },
  {
    id: 4,
    title: "Stock Price Checker",
    description:
      "A full-stack JavaScript application that fetches real-time stock market prices and displays historical charts. Features live price updates, portfolio tracking, and market analytics.",
    techStack: ["JavaScript", "Node.js", "Express.js", "REST APIs", "React"],
    githubUrl: "https://github.com/SindeSaikiran",
    imageUrl: "",
  },
  {
    id: 5,
    title: "Rock Paper Scissors AI Bot",
    description:
      "A machine learning bot trained to beat other bots at Rock Paper Scissors, achieving over 60% win rate by learning opponent patterns and predicting future moves.",
    techStack: ["Python", "Machine Learning", "Pattern Recognition", "Statistics"],
    githubUrl: "https://github.com/SindeSaikiran",
    imageUrl: "",
  },
];

router.get("/projects", (_req, res) => {
  res.json(projects);
});

export default router;
