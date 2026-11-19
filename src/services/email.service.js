const sendEmail = async ({ to, subject, textContent }) => {
  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL
        },
        to: [to],
        subject,
        textContent
      })
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Brevo email sending failed"
    );
  }

  return responseData;
};



const serviceLabels = {
  "brand-identity": "Brand Identity",
  "web-design-development": "Web Design & Development",
  "app-development": "App Development",
  "graphic-design": "Graphic Design",
  "video-editing-motion": "Video Editing & Motion",
  "social-media-marketing": "Social Media Marketing",
  "not-sure-yet": "Not sure yet"
};



const budgetLabels = {
  "prefer-not-to-say": "Prefer not to say",
  "under-1-lakh": "Under ₹1 lakh",
  "1-3-lakh": "₹1-3 lakh",
  "3-10-lakh": "₹3-10 lakh",
  "10-lakh-plus": "₹10 lakh+",
  "not-sure-yet": "Not sure yet"
};


// Admin notification email
const sendAdminNotification = (enquiry) => {
  const services = enquiry.services
    .map(service => serviceLabels[service] || service)
    .join(", ");

  const budget = enquiry.budget
    ? budgetLabels[enquiry.budget] || enquiry.budget
    : "Not provided";

  return sendEmail({
    to: {
      email: process.env.ADMIN_NOTIFICATION_EMAIL,
      name: "Markexa Team"
    },
    subject: "New Website Enquiry - Markexa India",
    textContent: `
New enquiry received.

Name: ${enquiry.name}
Email: ${enquiry.email}
Company: ${enquiry.company || "Not provided"}
Services: ${services}
Budget: ${budget}
Timeline: ${enquiry.timeline || "Not provided"}

Message:
${enquiry.message}
    `
  });
};


// Customer confirmation email
const sendUserConfirmation = (enquiry) => {
  return sendEmail({
    to: {
      email: enquiry.email,
      name: enquiry.name
    },
    subject: "We received your enquiry - Markexa India",
    textContent: `
Hello ${enquiry.name},

Thank you for contacting Markexa India.

We have received your enquiry successfully.
Our team will review your details and get back to you.

Regards,
Markexa India
    `
  });
};


module.exports = {
  sendEmail,
  sendAdminNotification,
  sendUserConfirmation
};
