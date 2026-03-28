export const personalDetails = {
  name: "Abhijith K M",
  tagline: "Full-Stack Software Engineer",
  logoSuffix: ".KM",
  heroDescription:
    "Full-Stack Software Engineer building enterprise React applications with .NET/C# backends, Redux, MUI, and AWS cloud infrastructure. I ship scalable, production-grade software.",
  credibilityLine: "Currently building enterprise SaaS at NimbleXcel with React, .NET 8, and AWS.",
  description:
    "Software Engineer currently working at NimbleXcel, building full-stack applications with React 18, .NET 8, C#, and SQL Server. Working across the entire stack — from MUI component libraries and Redux state management to Entity Framework, MediatR CQRS patterns, and AWS cloud deployments.",
  aboutTitle: "Full-Stack Engineer & React Specialist",
  aboutExtended:
    "I build enterprise-grade applications end-to-end — React frontends with MUI, Redux Toolkit, and React Query on the client side, paired with .NET 8 APIs using MediatR, Entity Framework, and SQL Server on the backend. My experience includes AWS cloud infrastructure (S3, Secrets Manager, DynamoDB), Docker/Kubernetes deployments, and background job processing with Hangfire and MassTransit.",
  recruiterHighlights: [
    "Full-Stack Software Engineer",
    "React 18 + MUI + Redux Toolkit",
    ".NET 8 / C# / Entity Framework / MediatR",
    "AWS (S3, Secrets Manager, DynamoDB, Athena)",
    "Docker + Kubernetes + CI/CD",
    "SQL Server + Redis + Message Queues",
  ],
  terminalLines: [
    { text: "npm run build", delay: 0 },
    { text: "\u2714 Compiling React App...", delay: 1200 },
    { text: "\u2714 dotnet build — API ready", delay: 2200 },
    { text: "\u2714 Docker image pushed", delay: 3200 },
    { text: "\u2714 Deployed to AWS \ud83d\ude80", delay: 4200 },
  ],
  email: "meabhijithkm@gmail.com",
  phone: "9188418821",
  address: "India",
  resumeUrl: "/resume.pdf",
  availableForWork: false,
  careerStartYear: 2017,
};

export const skills = [
  // Frontend
  {
    name: "React",
    level: "Expert",
    description: "Building enterprise SPAs with React 18, hooks, and component architecture.",
    category: "Frontend",
    icon: "react",
  },
  {
    name: "JavaScript",
    level: "Expert",
    description: "ES2023+, async patterns, and complex application logic.",
    category: "Frontend",
    icon: "js",
  },
  {
    name: "TypeScript",
    level: "Advanced",
    description: "Type-safe development in large-scale applications.",
    category: "Frontend",
    icon: "ts",
  },
  {
    name: "Redux Toolkit",
    level: "Expert",
    description: "Global state management with RTK, redux-persist, and reselect.",
    category: "Frontend",
    icon: "redux",
  },
  {
    name: "MUI (Material UI)",
    level: "Expert",
    description: "MUI v5 components, DataGrid, date pickers, and theming.",
    category: "Frontend",
    icon: "mui",
  },
  {
    name: "React Query",
    level: "Advanced",
    description: "Server state management with TanStack React Query.",
    category: "Frontend",
    icon: "reactquery",
  },
  {
    name: "CSS / Emotion",
    level: "Expert",
    description: "CSS-in-JS with Emotion, styled-components, and responsive design.",
    category: "Frontend",
    icon: "css",
  },
  // Backend
  {
    name: "C# / .NET 8",
    level: "Advanced",
    description: "ASP.NET Core Minimal APIs, MediatR CQRS, and background jobs.",
    category: "Backend",
    icon: "dotnet",
  },
  {
    name: "Entity Framework",
    level: "Advanced",
    description: "EF Core 9 with SQL Server, migrations, and multi-tenancy.",
    category: "Backend",
    icon: "ef",
  },
  {
    name: "PHP / Laravel",
    level: "Advanced",
    description: "Full-stack web applications with Laravel and CodeIgniter.",
    category: "Backend",
    icon: "laravel",
  },
  // Database & Infra
  {
    name: "SQL Server",
    level: "Expert",
    description: "Database design, stored procedures, and Dapper queries.",
    category: "Database",
    icon: "sqlserver",
  },
  {
    name: "MySQL",
    level: "Expert",
    description: "Database management and query optimization.",
    category: "Database",
    icon: "mysql",
  },
  {
    name: "Redis",
    level: "Intermediate",
    description: "Caching layer with StackExchange.Redis.",
    category: "Database",
    icon: "redis",
  },
  {
    name: "AWS",
    level: "Advanced",
    description: "S3, Secrets Manager, DynamoDB, Athena, and CodeBuild.",
    category: "DevOps",
    icon: "aws",
  },
  {
    name: "Docker / K8s",
    level: "Intermediate",
    description: "Containerized deployments with Docker Compose and Kubernetes.",
    category: "DevOps",
    icon: "docker",
  },
];

export const experience = [
  {
    name: "NimbleXcel Software Pvt Ltd",
    position: "Software Engineer",
    startDate: "2024",
    endDate: "Present",
    description: "Building enterprise SaaS applications with React 18, MUI, Redux Toolkit, and .NET 8 C# APIs. Working with Entity Framework, MediatR CQRS, SQL Server, Redis caching, and AWS cloud services. Containerized deployments with Docker and Kubernetes.",
    techStack: ["React", "JavaScript", "C#", ".NET 8", "SQL Server", "Redis", "AWS", "Docker"],
  },
  {
    name: "AdroitMinds Software Labs",
    position: "Software Engineer",
    startDate: "2023",
    endDate: "2024",
    description: "Deployed applications and APIs on AWS. Integrated themes into existing React applications and built reusable UI components.",
    techStack: ["React", "JavaScript", "AWS"],
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
    title: "Enterprise SaaS Development",
    description: "Building production enterprise applications with React, .NET 8, and multi-tenant SQL Server architecture.",
    icon: "rocket",
  },
  {
    title: "AWS Cloud Infrastructure",
    description: "S3, Secrets Manager, DynamoDB, Athena, and CodeBuild CI/CD pipelines.",
    icon: "cloud",
  },
  {
    title: "Full-Stack Architecture",
    description: "End-to-end development with React + MUI frontend and .NET 8 + EF Core backend.",
    icon: "layers",
  },
  {
    title: "DevOps & Containerization",
    description: "Docker, Kubernetes, and automated CI/CD with AWS CodeBuild.",
    icon: "zap",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#hobby-apps" },
  { label: "Contact", href: "#contact" },
];

/** All section ids for scroll-spy (includes sections not in nav) */
export const allSectionIds = [
  "home",
  "about",
  "skills",
  "hobby-apps",
  "experience",
  "achievements",
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
  redux: "#764ABC",
  mui: "#007FFF",
  reactquery: "#FF4154",
  css: "#1572B6",
  dotnet: "#512BD4",
  ef: "#512BD4",
  laravel: "#FF2D20",
  sqlserver: "#CC2927",
  mysql: "#4479A1",
  redis: "#DC382D",
  aws: "#FF9900",
  docker: "#2496ED",
};
