const MedicalRecord = require("../models/MedicalRecord");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Load API key from .env file

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY); // Use your Gemini API key

/**
 * Generate AI-powered medical record summary using Google Gemini
 */
const generateMedicalSummary = async (patientId) => {
  try {
    // Fetch patient's past medical records
    const records = await MedicalRecord.find({ patient: patientId }).sort({ date: -1 }).limit(10);
    if (!records.length) return "No medical history available.";

    // Extract key details
    const medicalData = records.map((record) => ({
      date: record.date.toISOString().split("T")[0],
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      medications: record.medications.join(", "),
    }));

    // Create prompt for AI summarization
    const prompt = `Summarize the following medical history for a doctor:\n\n${JSON.stringify(medicalData, null, 2)}`;

    // Use Gemini (Free Model)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    return result.response.text(); // Return AI-generated summary
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Error generating summary.";
  }
};

module.exports = { generateMedicalSummary };
