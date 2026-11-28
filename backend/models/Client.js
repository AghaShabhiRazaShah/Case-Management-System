const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client ka naam likhna zaroori hai'],
    trim: true
  },
  cnic: {
    type: String,
    required: [true, 'Client ka CNIC likhna zaroori hai'],
    unique: true, // Har client ka CNIC unique hoga
    trim: true,
    match: [/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, 'Please fill a valid CNIC format (e.g., 42000-1234567-1)']
  },
  phone: {
    type: String,
    required: [true, 'Client ka phone number likhna zaroori hai'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true // Ye khud ba khud 'createdAt' aur 'updatedAt' ka time save karega
});

// Model ko export karna taake controllers use kar sakein
module.exports = mongoose.model('Client', clientSchema);