const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ---------- Helpers ---------- */

function safeExtractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");
  return JSON.parse(match[0]);
}

function extractBudgetFromText(text) {
  const match = text.match(/\$?(\d{4,6})/);
  return match ? Number(match[1]) : 0;
}

/* ---------- RFP Generation ---------- */

async function generateRfpUsingAI(userText) {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: `
You are an API.

Return ONLY valid JSON.
No explanations. No markdown.

Schema:
{
  "title": string,
  "description": string,
  "budget": number,
  "items": [{ "name": string, "quantity": number, "specs": string }],
  "deliveryTimeline": string,
  "paymentTerms": string,
  "warranty": string
}

Text:
"""${userText}"""
`
  });

  const raw =
    response.output_text ||
    response.output[0].content[0].text;

  console.log("🧠 AI RAW RFP:\n", raw);

  const aiData = safeExtractJSON(raw);

  // 🔐 Field-level fallback
  return {
    title: aiData.title || "Generated RFP",
    description: aiData.description || userText,
    budget: aiData.budget || extractBudgetFromText(userText),
    items: Array.isArray(aiData.items) ? aiData.items : [],
    deliveryTimeline: aiData.deliveryTimeline || "",
    paymentTerms: aiData.paymentTerms || "",
    warranty: aiData.warranty || ""
  };
}

/* ---------- Proposal Parsing ---------- */

async function parseVendorProposal(text) {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `
Extract structured data from this vendor proposal.

Return ONLY valid JSON:
{
  "price": number | null,
  "deliveryTimeline": "",
  "paymentTerms": "",
  "warranty": "",
  "aiSummary": ""
}

Proposal:
"""${text}"""
`
    });

    const raw =
      response.output_text ||
      response.output[0].content[0].text;

    return JSON.parse(raw);
  } catch (err) {
    console.error("AI proposal parsing failed:", err);
    return {
      price: null,
      deliveryTimeline: "",
      paymentTerms: "",
      warranty: "",
      aiSummary: "AI parsing failed. Manual review required."
    };
  }
}

/* ---------- Proposal Comparison ---------- */

async function compareProposalsWithAI(proposals) {
  try {
    const summary = proposals.map(p => `
Vendor: ${p.vendorId.name}
Price: ${p.price || "N/A"}
Delivery: ${p.deliveryTimeline || "N/A"}
Payment: ${p.paymentTerms || "N/A"}
Warranty: ${p.warranty || "N/A"}
`).join("\n");

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `
Compare these proposals and recommend ONE vendor.
Explain briefly why.

${summary}
`
    });

    return (
      response.output_text ||
      response.output[0].content[0].text
    );
  } catch (err) {
    console.error("AI comparison failed:", err);
    return "AI recommendation unavailable. Please review manually.";
  }
}

module.exports = {
  generateRfpUsingAI,
  parseVendorProposal,
  compareProposalsWithAI
};
