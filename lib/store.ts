import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

// Mock data for job listings
const mockJobs = [
  {
    id: uuidv4(),
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing web designs.",
    experienceLevel: "Mid-Level",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    featured: true,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    responsibilities: [
      "Develop and maintain user interfaces using React and Next.js",
      "Collaborate with designers to implement web designs",
      "Write clean, maintainable, and efficient code",
      "Optimize applications for maximum speed and scalability",
    ],
    requirements: [
      "3+ years of experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with responsive design",
      "Familiarity with modern frontend tools and workflows",
    ],
  },
  {
    id: uuidv4(),
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    description:
      "We're seeking a Backend Engineer to design and implement server-side applications. You'll work on our core infrastructure and APIs.",
    experienceLevel: "Senior",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    featured: false,
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    responsibilities: [
      "Design and implement scalable backend services",
      "Optimize database queries and data structures",
      "Collaborate with frontend developers to integrate user-facing elements",
      "Implement security and data protection measures",
    ],
    requirements: [
      "5+ years of experience in backend development",
      "Strong knowledge of Node.js or Python",
      "Experience with SQL and NoSQL databases",
      "Understanding of cloud services (AWS, GCP, or Azure)",
    ],
  },
  {
    id: uuidv4(),
    title: "UX/UI Designer",
    company: "CreativeMinds",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description:
      "Join our design team to create beautiful and intuitive user experiences. You'll work on various projects from concept to implementation.",
    experienceLevel: "Mid-Level",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    featured: true,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain design systems and documentation",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency with design tools like Figma or Adobe XD",
      "Portfolio demonstrating strong design skills",
      "Understanding of user-centered design principles",
    ],
  },
  {
    id: uuidv4(),
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines.",
    experienceLevel: "Senior",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    featured: false,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    responsibilities: [
      "Design and implement cloud infrastructure using IaC",
      "Set up and maintain CI/CD pipelines",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
    ],
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of containerization and orchestration",
      "Experience with cloud providers (AWS, GCP, or Azure)",
      "Understanding of networking and security concepts",
    ],
  },
  {
    id: uuidv4(),
    title: "Product Manager",
    company: "InnovateCo",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join our product team to lead the development of innovative solutions. You'll work closely with engineering, design, and business teams.",
    experienceLevel: "Senior",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    featured: true,
    skills: ["Product Strategy", "Agile", "User Stories", "Market Research"],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize requirements",
      "Work with engineering and design teams to deliver features",
      "Analyze market trends and user feedback",
    ],
    requirements: [
      "5+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Experience with Agile methodologies",
      "Excellent communication and leadership abilities",
    ],
  },
  {
    id: uuidv4(),
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    description:
      "We're seeking a Data Scientist to help us extract insights from complex datasets and build machine learning models.",
    experienceLevel: "Mid-Level",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    featured: false,
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    responsibilities: [
      "Analyze large datasets to extract actionable insights",
      "Develop and implement machine learning models",
      "Create data visualizations and reports",
      "Collaborate with engineering and product teams",
    ],
    requirements: [
      "3+ years of experience in data science or related field",
      "Strong programming skills in Python",
      "Experience with machine learning frameworks",
      "Knowledge of statistical analysis and modeling",
    ],
  },
  {
    id: uuidv4(),
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$70 - $90 per hour",
    description:
      "We're looking for a Full Stack Developer to work on client projects. You'll be responsible for both frontend and backend development.",
    experienceLevel: "Mid-Level",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    featured: true,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    responsibilities: [
      "Develop full-stack web applications",
      "Implement responsive user interfaces",
      "Design and develop RESTful APIs",
      "Optimize applications for performance",
    ],
    requirements: [
      "3+ years of experience in full-stack development",
      "Strong knowledge of JavaScript and modern frameworks",
      "Experience with database design and management",
      "Ability to work independently and in a team",
    ],
  },
  {
    id: uuidv4(),
    title: "QA Engineer",
    company: "QualitySoft",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $100,000",
    description:
      "Join our QA team to ensure the quality of our software products. You'll design and execute test plans and identify bugs.",
    experienceLevel: "Entry-Level",
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    featured: false,
    skills: ["Manual Testing", "Automated Testing", "JIRA", "Test Planning"],
    responsibilities: [
      "Design and execute test plans and test cases",
      "Identify, report, and track bugs",
      "Perform regression testing",
      "Collaborate with developers to resolve issues",
    ],
    requirements: [
      "1+ years of experience in software testing",
      "Knowledge of testing methodologies",
      "Experience with bug tracking tools",
      "Attention to detail and problem-solving skills",
    ],
  },
]

// Define the store type
interface JobStore {
  jobs: any[]
  fetchJobs: () => void
  addJob: (job: any) => void
  updateJob: (job: any) => void
  deleteJob: (id: string) => void
}

// Create the store
export const useJobStore = create<JobStore>((set) => ({
  jobs: [],

  fetchJobs: () => {
    // In a real app, this would be an API call
    set({ jobs: mockJobs })
  },

  addJob: (job) => {
    set((state) => ({
      jobs: [job, ...state.jobs],
    }))
  },

  updateJob: (updatedJob) => {
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    }))
  },

  deleteJob: (id) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }))
  },
}))

