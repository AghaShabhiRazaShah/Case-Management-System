const Document = require('../models/Document');

// 1. Document Upload Karna
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Koi file upload nahi hui' });
    }

    const { caseId } = req.body;

    const newDoc = await Document.create({
      caseId: caseId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id // Security guard (middleware) se user ki ID
    });

    res.status(201).json({ success: true, data: newDoc });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Kisi Case ke Saare Documents Lana
const getDocumentsByCase = async (req, res) => {
  try {
    const docs = await Document.find({ caseId: req.params.caseId });
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadDocument, getDocumentsByCase };