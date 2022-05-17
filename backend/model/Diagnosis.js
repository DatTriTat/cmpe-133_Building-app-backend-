const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const diagnosisSchema = new Schema({
    email: {
        type: String,
    },
    symptom: {
        type: String,
    },
    specificSymptoms: {
        type: Array,
    },
    medications: {
        type: Array,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);