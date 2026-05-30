import * as z from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  eventType: z.string().min(2, "Event type is required"),
  dateLocation: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type BookingSchema = z.infer<typeof bookingSchema>;
