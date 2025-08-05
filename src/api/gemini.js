import axios from "axios";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Replace with your real key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function fetchGeminiReply(userMessage) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: userMessage }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        }
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Sorry, I couldn't generate a reply right now.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, there was a problem connecting to the AI.";
  }
}
