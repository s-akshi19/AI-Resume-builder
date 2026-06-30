const ResumeModel = require('../Models/resume');
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { CohereClientV2  } = require("cohere-ai");

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
});

exports.addResume = async (req, res) => {
    try {
        const { job_desc, user } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }

        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        const prompt = `
            You are a resume screening assistant.
            Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback.

            Resume:
            ${pdfData.text}

            Job Description:
            ${job_desc}

            Return the score and a brief explanation in this format:
            Score: XX
            Reason: ...
            `;

      const response = await cohere.chat({
    model: "command-a-plus-05-2026",
    messages: [
        { role: "user", content: prompt }
    ],
});
let result = response.message.content.find(item => item.type === "text").text;

                const scoreMatch = result.match(/Score:\s*(\d+)/i);
        const reasonMatch = result.match(/Reason:\s*([\s\S]*)/i);

        const score = scoreMatch ? scoreMatch[1] : "N/A";
        const reason = reasonMatch ? reasonMatch[1].trim() : result;

        const newResume = new ResumeModel({
            user: user,
            resume_name: req.file.originalname,
            job_desc: job_desc,
            score: score,
            feedback: reason
        });

        await newResume.save();
        fs.unlinkSync(pdfPath);

        res.status(200).json({ message: "Your analysis are ready", data: newResume });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getAllResumesForUser = async (req, res) => {
    try {
        const { user } = req.params;
        const resumes = await ResumeModel.find({ user: user }).sort({ createdAt: -1 });
        res.status(200).json({ data: resumes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getResumeForAdmin = async (req, res) => {
    try {
        const resumes = await ResumeModel.find().populate('user').sort({ createdAt: -1 });
        res.status(200).json({ data: resumes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error', message: err.message });
    }
}