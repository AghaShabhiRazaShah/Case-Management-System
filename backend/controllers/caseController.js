const Case = require('../models/Case');

// 1. Naya Case Banana (Create)
const createCase = async (req, res) => {
  try {
    // Ab hum clientName aur clientCNIC nahi, balki 'client' (jo ke ID hai) lenge
    const { caseNumber, title, type, status, hearingDate, courtName, client, assignedLawyer, description } = req.body;

    const existingCase = await Case.findOne({ caseNumber });
    if (existingCase) {
      return res.status(400).json({ message: 'Ye case number pehle se mojood hai!' });
    }

    const newCase = await Case.create({
      caseNumber, title, type, status, hearingDate, courtName, client, assignedLawyer, description,
      createdBy: req.user.id 
    });

    res.status(201).json({ success: true, data: newCase });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Sab Cases ki List Lana (Read All)
const getCases = async (req, res) => {
  try {
    // Yahan .populate('client') lagaya hai taake Client ki puri details sath aa jayen
    const cases = await Case.find().populate('client');
    res.status(200).json({ success: true, count: cases.length, data: cases });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. Ek Specific Case ki Details Lana (Read One)
const getCaseById = async (req, res) => {
  try {
    // Yahan bhi .populate('client') lagaya hai
    const caseItem = await Case.findById(req.params.id).populate('client');
    if (!caseItem) {
      return res.status(404).json({ message: 'Case nahi mila' });
    }
    res.status(200).json({ success: true, data: caseItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. Case Update Karna (Update)
const updateCase = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: 'Case nahi mila' });
    }

    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: updatedCase });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. Case Delete Karna (Delete)
const deleteCase = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ message: 'Case nahi mila' });
    }

    await caseItem.deleteOne();
    res.status(200).json({ success: true, message: 'Case delete ho gaya' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createCase, getCases, getCaseById, updateCase, deleteCase };