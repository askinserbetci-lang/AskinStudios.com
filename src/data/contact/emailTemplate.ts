import { ContactSchema } from "../../lib/validation/contactSchema";

export const contactEmailTemplate = (data: ContactSchema) => `
New Booking Inquiry

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Location: ${data.location || 'N/A'}

Project Type: ${data.projectType}
Timeline: ${data.timeline}

Description:
${data.description}

References:
${data.references || 'N/A'}

Additional Notes:
${data.additionalNotes || 'N/A'}

---
Sent from the Aşkın Studios Contact Page
`;
