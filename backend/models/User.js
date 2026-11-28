const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password ko secure (hash) karne ke liye

// User ka Schema (Database ka design)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Naam likhna zaroori hai'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email likhna zaroori hai'],
    unique: true, // Ek email sirf ek baar register ho sakta hai
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password likhna zaroori hai'],
    minlength: 6
  },
  // Handbook ke mutabiq 5 Roles
  role: {
    type: String,
    enum: ['partner', 'associate', 'clerk', 'accountant', 'client'],
    default: 'clerk' // Agar role na diya jaye toh by default clerk ban jayega
  },
  phone: {
    type: String,
    trim: true
  },
  cnic: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Ye khud ba khud 'createdAt' aur 'updatedAt' ka time save karega
});

// Password ko database mein save hone se pehle Hash (Encrypt) karne ka code (UPDATED)
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Login ke waqt password match karne ka code
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Model ko export karna taake doosri files use kar sakein
module.exports = mongoose.model('User', userSchema);