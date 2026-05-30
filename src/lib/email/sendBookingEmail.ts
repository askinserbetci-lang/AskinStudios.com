import { BookingInquiryData } from "../../types/booking";

export async function sendBookingEmail(data: BookingInquiryData) {
  // Construct the email body
  const subject = `Booking Inquiry: ${data.eventType} - ${data.name}`;
  const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Event Type: ${data.eventType}
Date/Location: ${data.dateLocation || 'N/A'}
Budget: ${data.budget || 'N/A'}

Message:
${data.message}
  `.trim();

  // Open the user's default email client
  const mailtoLink = `mailto:booking@askinstudios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  // Return a resolved promise to simulate success to the UI
  return Promise.resolve();
}
