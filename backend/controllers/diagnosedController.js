const Diagnosis = require('../model/Diagnosis');
const User = require('../model/User');

const newRecord = async (req, res) => {
    const {email, symptom, specificSymptoms, medications } = req.body;
    try {
        const user = await User.findOne({email: req.userInfo.UserInfo.email})
        if (!user) return res.status(401).json({
            message: 'Unauthorized'
        })
    
        const newRecord = await Diagnosis({
            "email": email,
            "symptom": symptom,
            "specificSymptoms":specificSymptoms,
            "medications":medications,
            "user": user._id
        });
        const save = await newRecord.save()
        user.record = user.record.concat(save._id)
        await user.save()
        console.log(newRecord);
        
        res.status(201).json({ 'success': `New user ${newRecord} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { newRecord };