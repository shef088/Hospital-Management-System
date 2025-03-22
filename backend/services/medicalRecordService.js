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
    const records = await MedicalRecord.find({ patient: patientId }).sort({ visitDate: -1 }).limit(10);
    if (!records.length) return "No medical history available.";

    // Debugging: Log records to check data format
    console.log("Fetched medical records:", records);

    // Extract key details with date validation
    const medicalData = records.map((record) => ({
      date: record.visitDate ? new Date(record.visitDate).toISOString().split("T")[0] : "Unknown",
      diagnosis: record.diagnosis || "Not specified",
      treatment: record.treatment || "Not specified",
      medications: record.medications?.length ? record.medications.join(", ") : "None",
    }));

    console.log("Formatted medical data:", medicalData); // Debugging

    // Create prompt for AI summarization
    const prompt = `Summarize the following medical history for a doctor:\n\n${JSON.stringify(medicalData, null, 2)}`;

    // Use Gemini (Google AI)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text(); // Return AI-generated summary
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Error generating summary.";
  }
};


module.exports = { generateMedicalSummary };
