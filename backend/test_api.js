const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testDocumentAPI() {
  try {
    console.log("--- Testing Document Upload API ---");

    // 1. Login kar ke Token lein
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'meer@mangriolaw.com', 
      password: 'Partner123'             
    });
    const token = loginRes.data.token;
    console.log("✅ Step 1: Login Successful.");

    // 2. Database se ek mojooda Case dhundhein
    const casesRes = await axios.get('http://localhost:5000/api/cases', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (casesRes.data.count === 0) {
        console.log("❌ Database mein koi case mojood nahi hai.");
        return;
    }
    
    const targetCaseId = casesRes.data.data[0]._id;
    console.log("✅ Step 2: Case mila. Uski ID:", targetCaseId);

    // 3. File Upload Karein
    const form = new FormData();
    
    // Hum 'package.json' ko ek dummy file ki tarah use kar rahe hain (kyunke ye backend folder mein mojood hai)
    const dummyFilePath = path.join(__dirname, 'package.json'); 
    form.append('document', fs.createReadStream(dummyFilePath), 'Test_FIR_Document.pdf');
    form.append('caseId', targetCaseId);

    const uploadRes = await axios.post('http://localhost:5000/api/documents', form, {
      headers: {
        ...form.getHeaders(), // Ye line file upload ke liye bohot zaroori hai
        Authorization: `Bearer ${token}`
      }
    });
    console.log("✅ Step 3: Document Upload ho gaya!");
    console.log("Saved Path:", uploadRes.data.data.filePath);

    // 4. Verify Karein ke Document Case se link hua hai
    const docsRes = await axios.get(`http://localhost:5000/api/documents/case/${targetCaseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Step 4: Is case ke total documents:", docsRes.data.count);

  } catch (error) {
    console.error("❌ FAILED! Error:");
    console.error(error.response ? error.response.data : error.message);
  }
}

testDocumentAPI();