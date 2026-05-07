import { ai } from './src/lib/gemini.ts';

async function test() {
  const prompt = `You are an AI extraction engine for a manufacturing order system.

Extract:
- intent
- orders (Array of objects containing: product_name, material, quantity, deadline, quality_note)
- order_id
- status
- quality_note
- search_query (string)
- filter_status (string)

Rules:
- Return ONLY valid JSON
- No markdown
- No explanations
- If the user mentions multiple distinct products, extract them into the "orders" array. If only one, put it in the "orders" array as a single item.
- If the user specifies a quality note while creating an order, include it in the "quality_note" field of the order object.
- The current year is 2026. If a date has no year, automatically use 2026.
- Extract the FULL product name including any descriptors or materials mentioned (e.g., "titanium support rods" not just "rods").
- Normalize unclear product names
- Infer material if possible
- Never return invalid JSON

Possible intents:
- create_order
- update_status
- quality_update
- search_order
- filter_orders

Possible statuses:
- Received
- In Review
- Accepted

User Message:
"We require 92 Solar panels by next Wednesday. Quality note: wrap it with bubble wraps"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
    console.log("Response:", response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
