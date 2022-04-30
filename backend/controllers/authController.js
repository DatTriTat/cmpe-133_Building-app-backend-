const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs

        /*const userForToken = {
            email: foundUser.email,
            id: foundUser._id,
        }

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).send({ token, username: foundUser.username, email: foundUser.email })
*/
        
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
        //res.json(foundUser)
        res.json({ accessToken, username: foundUser.username, email: foundUser.email });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };