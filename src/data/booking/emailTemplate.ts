import { BookingInquiryData } from "../../types/booking";

export const bookingEmailTemplate = (data: BookingInquiryData) => `
New Booking / Inquiry Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Event Type: ${data.eventType}
Date/Location: ${data.dateLocation || "N/A"}
Budget: ${data.budget || "N/A"}

Message:
${data.message}

---
Sent from the Aşkın Studios Booking Page
`;
