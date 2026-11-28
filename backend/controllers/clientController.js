const Client = require('../models/Client');

// 1. Naya Client Banana (Create)
const createClient = async (req, res) => {
  try {
    const { name, cnic, phone, address, email } = req.body;

    // Check karein ke ye CNIC pehle se mojood to nahi
    const existingClient = await Client.findOne({ cnic });
    if (existingClient) {
      return res.status(400).json({ message: 'Ye CNIC pehle se register hai!' });
    }

    const newClient = await Client.create({
      name, cnic, phone, address, email
    });

    res.status(201).json({ success: true, data: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. Sab Clients ki List Lana (Read All)
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. Ek Specific Client ki Details Lana (Read One)
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client nahi mila' });
    }
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. Client Update Karna (Update)
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client nahi mila' });
    }

    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: updatedClient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. Client Delete Karna (Delete)
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client nahi mila' });
    }

    await client.deleteOne();
    res.status(200).json({ success: true, message: 'Client delete ho gaya' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };