import * as z from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  references: z.string().optional(),
  additionalNotes: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
