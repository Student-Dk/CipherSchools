import { GoogleGenerativeAI } from "@google/generative-ai";
import Assignment from "../models/Assignment.js"; // 👈 Import Assignment model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateHint = async (req, res) => {
  try {


    const {assignmentId} = req.body;

    const question = await Assignment.findById(assignmentId);
    if (!question) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const prompt = `
You are a SQL tutor.

IMPORTANT:
- Give only a short conceptual hint.
- Do NOT provide the full SQL query.
- Do NOT reveal the final answer.

Question:
${question}

Student attempt:
 "No attempt yet"}

Keep the hint under 3 sentences.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ hint: text });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



