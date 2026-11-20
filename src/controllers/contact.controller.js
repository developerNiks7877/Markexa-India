
const Enquiry = require("../models/Enquiry");
const contactSchema = require("../validators/contact.validator");

const {
  sendAdminNotification,
  sendUserConfirmation,
} = require("../services/email.service");

const {
  appendEnquiryToGoogleSheet,
} = require("../services/googleSheet.service");

const createContact = async (req, res) => {
  try {
    // Validate request data
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    // Save enquiry in MongoDB
    const enquiry = await Enquiry.create(result.data);

    // Append enquiry to Google Sheets
    let googleSheetStatus = "failed";

    try {
      await appendEnquiryToGoogleSheet(enquiry);
      googleSheetStatus = "sent";
    } catch (error) {
      console.error("Google Sheets error:", error.message);
    }

    // Send email notifications
    const emailResults = await Promise.allSettled([
      sendAdminNotification(enquiry),
      sendUserConfirmation(enquiry),
    ]);

    // Check email status
    const emailStatus = emailResults.every(
      (result) => result.status === "fulfilled"
    ) ? "sent" : "failed";

    // Update email status in MongoDB
    try {
      await Enquiry.findByIdAndUpdate(
        enquiry._id,
        { emailStatus },
        { runValidators: true }
      );
    } catch (updateError) {
      console.error("Email status update failed:", updateError.message);
    }

    // Log email errors
    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          index === 0
            ? "Admin email failed:"
            : "User confirmation email failed:",
          result.reason?.message || result.reason
        );
      }
    });

    // Respond to the client
    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiryId: enquiry._id,
      emailStatus,
      googleSheetStatus,
    });

  } catch (error) {
    console.error("Create enquiry error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createContact };
