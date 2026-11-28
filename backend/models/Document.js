const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  // Ye field batayegi ke ye document kis Case ka hai
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: [true, 'Case ID dena zaroori hai']
  },
  fileName: {
    type: String, // File ka asli naam (e.g., FIR_Copy.pdf)
    required: true
  },
  filePath: {
    type: String, // Server par file kahan save hui (e.g., uploads/filename.pdf)
    required: true
  },
  fileType: {
    type: String, // File ki type (e.g., application/pdf, image/jpeg)
    required: true
  },
  uploadedBy: {
    type: String, // Kis lawyer ne upload kiya
    required: true
  }
}, {
  timestamps: true // Upload hone ka time save hoga
});

module.exports = mongoose.model('Document', documentSchema);