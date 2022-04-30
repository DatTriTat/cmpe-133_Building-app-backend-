const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }

    
});

module.exports = mongoose.model('Notes', noteSchema);