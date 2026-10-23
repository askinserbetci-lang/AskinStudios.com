import { BookingInquiryData } from "../../types/booking";
import { sendToAiq } from "../aiq";

// Booking inquiries go to the inbox in AiQ Creator
export async function sendBookingEmail(data: BookingInquiryData) {
  const { name, email, ...rest } = data as any;
  await sendToAiq("message", { kind: "booking", name, email, message: rest.message, details: rest });
}
