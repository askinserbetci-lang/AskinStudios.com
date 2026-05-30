export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  projectType: "composition" | "recording" | "performance" | "instrumentation" | "licensing" | "collaboration" | "other";
  timeline: "asap" | "1-2-weeks" | "1-2-months" | "flexible" | "event-date";
  description: string;
  references?: string;
  additionalNotes?: string;
  agreement: boolean;
}
