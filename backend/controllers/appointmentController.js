const Appointment = require('../model/Appointment');
const User = require('../model/User');

const newAppointment = async (req, res) => {
    const { username, age, phone, email, date, time, description } = req.body;
    try {
        const user = await User.findOne({email: req.userInfo.UserInfo.email})
        if (!user) return res.status(401).json({
            message: 'Unauthorized'
        })
    
        const newAppointment = await Appointment({
            "username": username,
            "age":age,
            "phone":phone,
            "email": email,
            "date": date,
            "time":time,
            "description":description,
            "user": user._id
        });
        const save = await newAppointment.save()
        user.appointment = user.appointment.concat(save._id)
        await user.save()
        console.log(newAppointment);
        
        res.status(201).json({ 'success': `New user ${newAppointment} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { newAppointment };