const Hearing = require('../models/Hearing');
const Case = require('../models/Case'); // Case model bhi chahiye taake usay update kar sakein

// 1. Nayi Hearing Add Karna (Create)
const createHearing = async (req, res) => {
  try {
    const { caseId, hearingDate, purpose, remarks, nextHearingDate } = req.body;

    // Hearing create karein
    const newHearing = await Hearing.create({
      caseId, hearingDate, purpose, remarks, nextHearingDate
    });

    // Bonus Professional Step: Main Case ki 'hearingDate' aur 'status' ko bhi update kar dein
    await Case.findByIdAndUpdate(caseId, {
      hearingDate: hearingDate,
      status: 'Active' // Jab hearing schedule ho, case active ho jata hai
    });

    res.status(201).json({ success: true, data: newHearing });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Kisi Specific Case ki Saari Hearings Lana (Read)
const getHearingsByCase = async (req, res) => {
  try {
    // URL se caseId lenge: /api/hearings/case/64f...
    // .sort({ hearingDate: 1 }) ka matlab hai purani se nayi date ke hisaab se list aayegi
    const hearings = await Hearing.find({ caseId: req.params.caseId }).sort({ hearingDate: 1 }); 
    
    res.status(200).json({ success: true, count: hearings.length, data: hearings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. Hearing Update Karna (Update) - e.g., Remarks add karna ya Status change karna
const updateHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findById(req.params.id);
    if (!hearing) {
      return res.status(404).json({ message: 'Hearing nahi mili' });
    }

    const updatedHearing = await Hearing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: updatedHearing });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. Hearing Delete Karna (Delete)
const deleteHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findById(req.params.id);
    if (!hearing) {
      return res.status(404).json({ message: 'Hearing nahi mili' });
    }

    await hearing.deleteOne();
    res.status(200).json({ success: true, message: 'Hearing delete ho gayi' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createHearing, getHearingsByCase, updateHearing, deleteHearing };