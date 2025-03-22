const MedicalRecord = require("../models/MedicalRecord");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

/**
 * Generate AI-powered medical record summary with oversight and suggestions
 */
const generateMedicalSummary = async (patientId) => {
  try {
    // Fetch the last 10 medical records for the patient
    const records = await MedicalRecord.find({ patient: patientId }).sort({ visitDate: -1 }).limit(10);
    if (!records.length) return "No medical history available.";

    // Extract key medical details
    const medicalData = records.map((record) => ({
      date: record.visitDate.toISOString().split("T")[0],
      diagnosis: record.diagnosis,
      treatment: record.treatment || "N/A",
      medications: record.medications.length ? record.medications.join(", ") : "None",
    }));

    // Construct prompt for AI analysis
    const prompt = `
    Here is a patient's recent medical history:

    ${JSON.stringify(medicalData, null, 2)}

    **TASK:**  
    1️⃣ Provide a concise medical summary.  
    2️⃣ Suggest possible improvements in treatment or follow-up.  
    3️⃣ Identify any contradictions, missing details, or concerns regarding the diagnosis or medications.  
    4️⃣ Offer professional recommendations for further steps.  
    Respond as if advising a doctor.  
    `;

    // Send request to Google AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Error generating summary.";
  }
};

module.exports = { generateMedicalSummary };
