const Note = require('../model/Note');
const bcrypt = require('bcrypt');

const createNote = async (req, res) => {
    const { user, age, phone, email, date, time, description } = req.body;
    if (!user || !email) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check for duplicate email in the db

    try {

        //create and store the new user
        const newNote = await Note.create({
            "username": user,
            "age":age,
            "phone":phone,
            "email": email,
            "date": date,
            "time":time,
            "description":description
        });
        newNote.user = req.user._id;
        await newNote.save();

        console.log(newNote);
        
        res.status(201).json({ 'success': `New user ${newNote} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { createNote };