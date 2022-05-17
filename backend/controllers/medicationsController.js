const Medication = require('../model/Medications');

const getAllMedication = async (req, res) => {
    const medications = await Medication.find({})
    
    if (!Medication) return res.status(204).json({ 'message': 'No medications found.' });
    res.json(medications);
}

module.exports = {getAllMedication}