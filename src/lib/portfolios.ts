export type TimelineItem = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  achievements?: string[];
};

export type Skill = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category?: string;
};

export type PortfolioData = {
  username: string; // Used for the URL slug (e.g., nimal-perera)
  theme: "dark" | "light";
  
  // Header Info
  fullName: string;
  tagline: string; // e.g. "Full Stack Engineer & Problem Solver"
  availabilityStatus: "Open to Work" | "Employed" | "Freelancing";
  
  // Media Output
  avatarUrl?: string; // Fallbacks to initials
  
  // Content Sections
  aboutSummary: string;
  
  // Lists
  experience: TimelineItem[];
  education: TimelineItem[];
  skills: Skill[];
  
  // Contact
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsappNumber?: string; // Standard format: +94771234567
  resumeUrl?: string; // Link to download PDF
};

// Mock Database of Clients
export const portfolios: PortfolioData[] = [
  {
    username: "nimal-perera",
    theme: "dark",
    fullName: "Nimal Perera",
    tagline: "Senior Software Engineer & Cloud Architect",
    availabilityStatus: "Open to Work",
    aboutSummary: "I am a dedicated software engineer with over 6 years of experience building scalable, cloud-native applications. I specialize in the deeply technical side of web development, optimizing backend architectures for enterprise clients. I believe in clean code, continuous integration, and translating business requirements into robust technical solutions.",
    
    experience: [
      {
        id: "exp-1",
        role: "Senior Software Engineer",
        organization: "Dialog Axiata",
        duration: "Jan 2021 - Present",
        description: "Leading the backend architecture for a high-traffic telecommunications portal serving over 2 million daily active users.",
        achievements: [
          "Reduced server response times by 35% through Redis caching.",
          "Led a team of 4 junior developers to build the new billing microservice.",
          "Migrated legacy monolithic systems to AWS Serverless.",
        ]
      },
      {
        id: "exp-2",
        role: "Software Engineer",
        organization: "Virtusa",
        duration: "Jun 2018 - Dec 2020",
        description: "Developed and maintained full-stack internal enterprise applications for global banking clients.",
        achievements: [
          "Developed automated reporting tools that saved 15 hours of manual work weekly.",
          "Integrated third-party payment gateways with zero downtime."
        ]
      }
    ],
    
    education: [
      {
        id: "edu-1",
        role: "BSc (Hons) in Software Engineering",
        organization: "University of Colombo School of Computing",
        duration: "2014 - 2018",
        description: "First Class Honours. Specialization in Distributed Systems and Cloud Computing."
      },
      {
        id: "edu-2",
        role: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        duration: "2020",
        description: "Credential ID: AWS-CSA-489271"
      }
    ],
    
    skills: [
      { name: "Node.js", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "AWS Cloud", level: "Advanced" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "Docker & Kubernetes", level: "Intermediate" },
    ],
    
    email: "contact@nimalperera.com",
    linkedinUrl: "https://linkedin.com/in/nimalperera",
    githubUrl: "https://github.com/nimal-p",
    whatsappNumber: "+94770000000",
  }
];

export const getPortfolioByUsername = (username: string) => {
  return portfolios.find(p => p.username.toLowerCase() === username.toLowerCase());
};
