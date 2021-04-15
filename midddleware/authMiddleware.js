const {
    required
} = require("joi");

const jwt = require('jsonwebtoken');
const keys = require("../config/default.json");

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. No auth token found');

    try {
        const payload = jwt.verify(token, keys.jwtKey);
        req.user = payload;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}