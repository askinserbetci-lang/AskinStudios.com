import { contactEmailTemplate } from "../../data/contact/emailTemplate";
import { ContactSchema } from "../validation/contactSchema";

export async function sendContactEmail(data: ContactSchema) {
  const body = contactEmailTemplate(data);

  // In a real application, you would send this to your backend or email provider
  // Example:
  /*
  await fetch(process.env.VITE_CONTACT_EMAIL_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: process.env.VITE_CONTACT_EMAIL_TO,
      subject: \`New Booking Inquiry: \${data.projectType}\`,
      text: body
    })
  });
  */
  
  console.log("Sending email with body:", body);
  
  // Simulate network request
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
