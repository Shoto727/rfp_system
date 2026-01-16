const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function extractJson(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON found in AI response");
  }
  return JSON.parse(text.slice(firstBrace, lastBrace + 1));
}

async function generateStructuredRFP(userText) {
  const prompt = `
Convert the following procurement request into structured JSON.

Rules:
- Return ONLY valid JSON
- Do NOT add explanations
- Do NOT wrap in markdown

JSON fields:
- title
- description
- budget (number)
- items (array of { name, quantity, specs })
- deliveryTimeline
- paymentTerms
- warranty

Text:
"""${userText}"""
`;

  const response = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0
  });

  const rawContent = response.choices[0].message.content;
  console.log("🧠 OPENAI RAW RESPONSE:\n", rawContent);

  return extractJson(rawContent);
}

async function parseVendorProposal(text) {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `
You are parsing a vendor proposal email.

Extract:
- price (number, if present)
- deliveryTimeline (string)
- paymentTerms (string)
- warranty (string)

Also generate a short 2–3 line summary.

Return ONLY valid JSON in this format:
{
  "price": number | null,
  "deliveryTimeline": "",
  "paymentTerms": "",
  "warranty": "",
  "aiSummary": ""
}

Vendor response:
${text}
`
    });

    const output =
      response.output_text ||
      response.output[0].content[0].text;

    return JSON.parse(output);
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

module.exports = {
  generateRfpUsingAI: generateStructuredRFP,
  parseVendorProposal
};

async function compareProposalsWithAI(proposals) {
  try {
    const summaryText = proposals.map(p => `
Vendor: ${p.vendorId.name}
Price: ${p.price || "N/A"}
Delivery: ${p.deliveryTimeline || "N/A"}
Payment: ${p.paymentTerms || "N/A"}
Warranty: ${p.warranty || "N/A"}
`).join("\n");

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `
You are helping select the best vendor for an RFP.

Compare the following proposals and recommend ONE vendor.
Explain briefly why.

${summaryText}
`
    });

    return (
      response.output_text ||
      response.output[0].content[0].text
    );
  } catch (err) {
    console.error("AI comparison failed:", err);
    return "AI recommendation unavailable. Please review proposals manually.";
  }
}

module.exports = {
  generateRfpUsingAI: generateStructuredRFP,
  parseVendorProposal,
  compareProposalsWithAI
};
