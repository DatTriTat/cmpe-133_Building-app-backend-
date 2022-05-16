const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    
    req.userInfo = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );
    next()
}

module.exports = verifyJWT