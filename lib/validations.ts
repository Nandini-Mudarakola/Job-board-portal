import * as z from "zod"

export const jobFormSchema = z.object({
  title: z.string().min(3, {
    message: "Job title must be at least 3 characters.",
  }),
  company: z.string().min(3, {
    message: "Company name must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  type: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]),
  salary: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  experienceLevel: z.enum(["Entry-Level", "Mid-Level", "Senior"]),
  skills: z.string().min(3, {
    message: "Skills must be at least 3 characters.",
  }),
  responsibilities: z.string().min(10, {
    message: "Responsibilities must be at least 10 characters.",
  }),
  requirements: z.string().min(10, {
    message: "Requirements must be at least 10 characters.",
  }),
})

