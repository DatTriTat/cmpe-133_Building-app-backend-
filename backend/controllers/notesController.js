const User = require('../model/User');
const bcrypt = require('bcrypt');

const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check for duplicate email in the db
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {

        //create and store the new user
        const result = await Note.create({
            "title": title,
            "content":content,
        });
        newNote.user = req.user.id;
        await newNote.save();
        console.log(result);
        
        res.status(201).json({ 'success': `New user ${result} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { createNote };