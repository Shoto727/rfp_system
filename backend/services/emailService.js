console.log("📧 Email user loaded:", process.env.EMAIL_USER);


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send RFP email to one vendor
async function sendRfpEmail(to, rfp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `RFP: ${rfp.title}`,
    text: `
Hello,

You are invited to submit a proposal for the following RFP:

Title: ${rfp.title}
Description: ${rfp.description}
Budget: ${rfp.budget}

Items:
${rfp.items.map(item =>
  `- ${item.name} (${item.quantity}) : ${item.specs}`
).join("\n")}

Delivery Timeline: ${rfp.deliveryTimeline}
Payment Terms: ${rfp.paymentTerms}
Warranty: ${rfp.warranty}

Please reply to this email with your proposal.

Regards,
Procurement Team
`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendRfpEmail };
