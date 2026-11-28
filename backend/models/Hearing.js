const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
  // Ye field batayegi ke ye hearing kis Case ki hai
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: [true, 'Case ID dena zaroori hai']
  },
  hearingDate: {
    type: Date,
    required: [true, 'Hearing ki date dena zaroori hai']
  },
  purpose: {
    type: String,
    enum: ['Bail', 'Arguments', 'Evidence', 'Witness', 'Filing', 'Other'], // Sunwai ka maqsad
    default: 'Other'
  },
  remarks: {
    type: String, // Judge ka faisla ya comments
    trim: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Adjourned', 'Concluded', 'Cancelled'], // Hearing ki halat
    default: 'Scheduled'
  },
  nextHearingDate: {
    type: Date // Agar hearing adjourn ho jaye to agli tareekh
  }
}, {
  timestamps: true // createdAt aur updatedAt khud save honge
});

module.exports = mongoose.model('Hearing', hearingSchema);