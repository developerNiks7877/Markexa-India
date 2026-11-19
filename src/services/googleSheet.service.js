const { google } = require("googleapis");

const privateKey = process.env.GOOGLE_PRIVATE_KEY;

console.log("Google Key Check:", {
  exists: Boolean(privateKey),
  length: privateKey?.length,
  startsCorrectly: privateKey?.includes("-----BEGIN PRIVATE KEY-----"),
  endsCorrectly: privateKey?.includes("-----END PRIVATE KEY-----"),
  hasLiteralNewlines: privateKey?.includes("\\n"),
  hasActualNewlines: privateKey?.includes("\n"),
});

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const appendEnquiryToGoogleSheet = async (enquiry) => {
  try {
    const client = await auth.getClient();

    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const values = [
      [
        enquiry.createdAt
          ? new Date(enquiry.createdAt).toLocaleString("en-IN")
          : new Date().toLocaleString("en-IN"),
        enquiry.name,
        enquiry.email,
        enquiry.company || "",
        Array.isArray(enquiry.services) ? enquiry.services.join(", ") : "",
        enquiry.budget || "",
        enquiry.timeline || "",
        enquiry.message,
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Enquiries!A:H",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    console.log("Google Sheet updated:", response.data.updates.updatedRange);

    return response.data;
  } catch (error) {
    console.error("Google Sheets append error:", error.message);
    throw error;
  }
};

module.exports = { appendEnquiryToGoogleSheet };
