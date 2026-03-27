export const personalDetails = {
  name: "Abhijith K M",
  tagline: "Frontend Engineer",
  heroDescription:
    "Frontend Engineer specializing in React, modern UI architecture, and scalable web applications. I build performant, accessible digital experiences that drive business results.",
  description:
    "I am a Software Engineer with expertise in React development, having worked at NimbleXcel and AdroitMinds Software Labs, where I deployed applications and APIs on AWS and integrated themes into existing projects.",
  email: "meabhijithkm@gmail.com",
  phone: "9188418821",
  address: "India",
};

export const skills = [
  {
    name: "JavaScript",
    level: "Expert",
    description:
      "Experienced in JavaScript for front-end and back-end development.",
    category: "Frontend",
    icon: "js",
  },
  {
    name: "TypeScript",
    level: "Advanced",
    description: "Used extensively in large-scale applications.",
    category: "Frontend",
    icon: "ts",
  },
  {
    name: "ReactJS",
    level: "Expert",
    description: "Building complex UIs and SPAs.",
    category: "Frontend",
    icon: "react",
  },
  {
    name: "jQuery",
    level: "Intermediate",
    description: "Used in older projects for dynamic UI interactions.",
    category: "Frontend",
    icon: "jquery",
  },
  {
    name: "CSS",
    level: "Expert",
    description: "Experience with responsive and modern UI design.",
    category: "Frontend",
    icon: "css",
  },
  {
    name: "Bootstrap",
    level: "Advanced",
    description: "Utilized for quick and efficient UI development.",
    category: "Frontend",
    icon: "bootstrap",
  },
  {
    name: "PHP",
    level: "Advanced",
    description: "Backend development for dynamic applications.",
    category: "Backend",
    icon: "php",
  },
  {
    name: "Laravel",
    level: "Advanced",
    description: "Building scalable web applications.",
    category: "Backend",
    icon: "laravel",
  },
  {
    name: "CodeIgniter",
    level: "Intermediate",
    description: "Used for MVC-based development.",
    category: "Backend",
    icon: "ci",
  },
  {
    name: "MySQL",
    level: "Expert",
    description: "Database management and optimization.",
    category: "Database",
    icon: "mysql",
  },
];

export const experience = [
  {
    name: "NimbleXcel Software Pvt Ltd",
    position: "Software Engineer",
    startDate: "2024",
    endDate: "Present",
    description: "React development",
    techStack: ["ReactJS", "JavaScript", "AWS"],
  },
  {
    name: "AdroitMinds Software Labs",
    position: "Software Engineer",
    startDate: "2023",
    endDate: "2024",
    description:
      "Deployment of applications and APIs on AWS, integration of themes into existing applications.",
    techStack: ["ReactJS", "JavaScript", "AWS"],
  },
  {
    name: "Government Engineering College Idukki (GECI)",
    position: "Instructor Grade II",
    startDate: "2021",
    endDate: "2023",
    description:
      "Assisted in labs, contributed to software development and website management.",
    techStack: ["PHP", "MySQL", "Laravel"],
  },
  {
    name: "Government Engineering College Idukki (GECI)",
    position: "Tradesman",
    startDate: "2017",
    endDate: "2021",
    description:
      "Assisted in labs, contributed to software development and website management.",
    techStack: ["PHP", "MySQL", "Codeigniter"],
  },
];

export const projects = [
  {
    name: "Website for Kerala Gazetted Officer's Association (KGOA)",
    description:
      "A web portal for managing membership, news, and events.",
    techStack: ["Laravel", "MySQL"],
    image: "/projects/kgoa.png",
  },
  {
    name: "Feedback Management Software for GEC Idukki",
    description:
      "A faculty evaluation system developed for academic institutions.",
    techStack: ["Laravel", "MySQL"],
    image: "/projects/feedback.png",
  },
];

export const education = [
  {
    name: "Government Engineering College Idukki",
    degree: "B.Tech in IT",
    startDate: "2014",
    endDate: "2017",
    location: "India",
  },
  {
    name: "Govt. Polytechnic College, Purappuzha",
    degree: "Diploma in IT",
    startDate: "2011",
    endDate: "2014",
    location: "India",
  },
];

export const achievements = [
  {
    title: "Production React Applications",
    description: "Built and shipped production-grade React applications used by real users.",
    icon: "rocket",
  },
  {
    title: "AWS Cloud Deployments",
    description: "Experience deploying applications and APIs on AWS infrastructure.",
    icon: "cloud",
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end development with Laravel, MySQL, and modern frontend stacks.",
    icon: "layers",
  },
  {
    title: "Scalable UI Systems",
    description: "Integrated APIs and built scalable, maintainable UI component systems.",
    icon: "zap",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#hobby-apps" },
  { label: "Contact", href: "#contact" },
];

/** All section ids for scroll-spy (includes sections not in nav) */
export const allSectionIds = [
  "home",
  "about",
  "skills",
  "experience",
  "achievements",
  "projects",
  "hobby-apps",
  "education",
  "contact",
];

/** Maps every section id to the nav item that should highlight */
export const sectionToNav: Record<string, string> = {
  home: "home",
  about: "about",
  skills: "about",
  education: "about",
  experience: "experience",
  achievements: "experience",
  projects: "projects",
  "hobby-apps": "hobby-apps",
  contact: "contact",
};

export const socialLinks = {
  github: "https://github.com/abhijithkm",
  linkedin: "https://www.linkedin.com/in/abhijith-km/",
  email: "mailto:meabhijithkm@gmail.com",
};

export const skillLevelPercent: Record<string, number> = {
  Expert: 95,
  Advanced: 80,
  Intermediate: 60,
};

export const skillIconColors: Record<string, string> = {
  js: "#F7DF1E",
  ts: "#3178C6",
  react: "#61DAFB",
  jquery: "#0769AD",
  css: "#1572B6",
  bootstrap: "#7952B3",
  php: "#777BB4",
  laravel: "#FF2D20",
  ci: "#EF4223",
  mysql: "#4479A1",
};
