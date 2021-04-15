const logger = require('../models/logger')


module.exports = function () {
    //following code handles the uncaught exception anywhere in code
    //BUT, in only works with synchronous methods. not promises/callbacks :(
    process.on('uncaughtException', (err) => {
        console.log('Ran into an error:' + err)
        logger.error(err.message, err);
    });

    //Below code for promise rejctions :)
    process.on('unhandledRejection', (err) => {
        console.log('Ran into an error:' + err)
        logger.error(err.message, err);
    });
}