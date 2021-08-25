 const jwt = require('jsonwebtoken');

module.exports = function authCheck(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        let token = req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(401).json({ message: "User is not logged in" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "User is not logged in" });
    }
}