const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Pehle environment variables load karein
dotenv.config();

// 2. Models aur Routes import karein
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

// caseRoute import krein
const caseRoutes = require('./routes/caseRoutes');

// clientRoute import krein
const clientRoutes = require('./routes/clientRoutes');

// hearingRoute import krein
const hearingRoutes = require('./routes/hearingRoutes');

// documentRoute import krein
const documentRoutes = require('./routes/documentRoutes');

// 3. App banayein (YE SAB SE PEHLE HONA CHAHIYE)
const app = express();

// 4. Middleware lagayein
app.use(cors());
app.use(express.json());

// 5. Routes use karein (AB app ban chuka hai, isliye error nahi aayega)
app.use('/api/auth', authRoutes);

// caseRoute add kiya hy yahan. 
app.use('/api/cases', caseRoutes);

// clientRoute add kiya hy yahan.
app.use('/api/clients', clientRoutes);

// hearingRoute add krna hy yahan.
app.use('/api/hearings', hearingRoutes);

// documentRoute add krna hy yahan py  (nichili line bhi esi ki hy)
app.use('/api/documents', documentRoutes);

// Ye line bohot zaroori hai: Ye 'uploads' folder ko browser ke liye open karti hai
app.use('/uploads', express.static('uploads')); 

// 6. Database Connection
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI && MONGO_URI !== 'your_connection_string_here') {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('✅ MongoDB Connected Successfully!'))
        .catch(err => console.log('❌ MongoDB Connection Error:', err.message));
} else {
    console.log('⚠️ MONGO_URI is missing in .env file.');
}

// 7. Basic Route
app.get('/', (req, res) => {
    res.send('Lawyer Management System Backend is Running! 🚀');
});

// 8. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});