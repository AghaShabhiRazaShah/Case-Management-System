const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: [true, 'Case number likhna zaroori hai'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Case ka title likhna zaroori hai'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Criminal', 'Civil', 'Family', 'Corporate', 'Tax', 'Other'], 
    default: 'Other'
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Closed', 'Adjourned'], 
    default: 'Pending'
  },
  hearingDate: {
    type: Date,
    required: false
  },
  courtName: {
    type: String,
    trim: true
  },
  
  // --- YAHAN BARI TABDEELI AAYI HAI ---
  // Ab hum Client ki ID save karenge, uska naam nahi
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Ye batata hai ke ye ID 'Client' model se aayi hai
    required: [true, 'Client select karna zaroori hai']
  },
  // ------------------------------------

  assignedLawyer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);