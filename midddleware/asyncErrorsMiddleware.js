module.exports = function (handlerFn) {
    return async (req, res, next) => {
        try {
            await handlerFn(req, res);
        } catch (error) {
            next(error);
        }
    }
}