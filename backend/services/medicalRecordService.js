const MedicalRecord = require("../models/MedicalRecord");
const { OpenAI } = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Set this in your .env file
// });

/**
 * Generate AI-powered medical record summary
 */
const generateMedicalSummary = async (patientId) => {
  // try {
  //   // Fetch patient's past medical records
  //   const records = await MedicalRecord.find({ patient: patientId }).sort({ date: -1 }).limit(10);
  //   if (!records.length) return "No medical history available.";

  //   // Extract key details
  //   const medicalData = records.map((record) => ({
  //     date: record.date.toISOString().split("T")[0],
  //     diagnosis: record.diagnosis,
  //     treatment: record.treatment,
  //     medications: record.medications.join(", "),
  //   }));

  //   // Create prompt for AI summarization
  //   const prompt = `Summarize the following medical history for a doctor:\n\n${JSON.stringify(medicalData, null, 2)}`;

  //   // Call OpenAI for summary
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4",
  //     messages: [{ role: "user", content: prompt }],
  //     temperature: 0.5,
  //   });

  //   return response.choices[0].message.content.trim();
  // } catch (error) {
  //   console.error("AI Summary Error:", error);
  //   return "Error generating summary.";
  // }
};

module.exports = { generateMedicalSummary };
