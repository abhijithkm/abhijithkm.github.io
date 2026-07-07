export const personalDetails = {
    name: "Abhijith K M",
    role: "Software Engineer",
    location: "Kerala, India",
    email: "meabhijithkm@gmail.com",
    phone: "+91 91884 18821",
    github: "https://github.com/abhijithkm",
    resumeUrl: process.env.PUBLIC_URL + "/resume.pdf",
    lede: "I build web applications that do real work — React front-ends, Laravel and PHP back-ends, and the databases underneath. Nine years of shipping software for companies, colleges, and co-operative banks.",
    stack: ["React", "TypeScript", "JavaScript", "Laravel", "PHP", "MySQL", "AWS"],
    about: [
        "I'm a software engineer specialising in React development. At NimbleXcel and AdroitMinds Software Labs I've deployed applications and APIs on AWS and integrated new themes into existing products.",
        "Before industry, I spent six years at Government Engineering College Idukki — first as a tradesman, then as an instructor — building the software that ran the college: attendance, hostel admissions, and faculty feedback systems, plus a web portal for the district co-operative bank.",
    ],
}

export const skillGroups = [
    { name: "Frontend", items: ["JavaScript", "TypeScript", "ReactJS", "CSS", "Bootstrap", "jQuery"] },
    { name: "Backend", items: ["PHP", "Laravel", "CodeIgniter"] },
    { name: "Data & infra", items: ["MySQL", "AWS"] },
]

export const experience = [
    {
        company: "NimbleXcel Software Pvt Ltd",
        position: "Software Engineer",
        period: "2024 — Present",
        points: ["React development for production applications."],
        techStack: ["ReactJS", "JavaScript", "AWS"],
    },
    {
        company: "AdroitMinds Software Labs",
        position: "Software Engineer",
        period: "2023 — 2024",
        points: [
            "Deployed multiple applications and APIs on AWS infrastructure.",
            "Integrated new themes into existing applications.",
        ],
        techStack: ["ReactJS", "JavaScript", "AWS"],
    },
    {
        company: "Government Engineering College Idukki",
        position: "Instructor Grade II",
        period: "2021 — 2023",
        points: [
            "Lab instruction for engineering students.",
            "Member of the college Software Development Cell (SDC) and website committee.",
        ],
        techStack: ["PHP", "Laravel", "MySQL"],
    },
    {
        company: "Government Engineering College Idukki",
        position: "Tradesman",
        period: "2017 — 2020",
        points: [
            "Built the OPPAM web portal for Idukki District Co-operative Bank.",
            "Developed attendance management and hostel admission software for the college.",
        ],
        techStack: ["PHP", "CodeIgniter", "MySQL"],
    },
]

export const projects = [
    {
        name: "KGOA Web Portal",
        client: "Kerala Gazetted Officers' Association",
        period: "2021 — 2022",
        description: "Website and web portal managing the association's activities — membership, news, and events — as a fully role-based web application.",
        techStack: ["Laravel", "MySQL"],
    },
    {
        name: "Feedback Management Software",
        client: "GEC Idukki",
        period: "2019 — 2021",
        description: "Faculty evaluation system where students register and submit feedback. Generalised so any academic institution can run it. Built under the college Software Development Cell.",
        techStack: ["Laravel", "MySQL"],
    },
    {
        name: "Hostel Admission Software",
        client: "GEC Idukki",
        period: "2019 — 2021",
        description: "Manages the full hostel admission workflow for students.",
        techStack: ["CodeIgniter", "MySQL"],
    },
    {
        name: "Attendance Management Software",
        client: "GEC Idukki",
        period: "2017 — 2020",
        description: "Timetable-based attendance tracking used across the college.",
        techStack: ["CodeIgniter", "MySQL"],
    },
    {
        name: "OPPAM Web Portal",
        client: "Idukki District Co-operative Bank",
        period: "2017 — 2018",
        description: "Portal managing information on all Kudumbashree units and their accounts under the OPPAM scheme.",
        techStack: ["PHP", "MySQL"],
    },
]

export const education = [
    {
        institution: "Government Engineering College Idukki",
        degree: "B.Tech in Information Technology",
        period: "2014 — 2017",
    },
    {
        institution: "Govt. Polytechnic College, Purappuzha",
        degree: "Diploma in Information Technology",
        period: "2011 — 2014",
    },
]
