const winston = require("winston");
const logger = require('../models/logger')

module.exports = function (err, req, res, next) {
    //   winston.error(err.message, err);
    logger.error(err.message, err);
    console.log(err);
    res.status(500).send("Something went wrong ");
};