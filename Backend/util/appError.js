// an Error object that will be returned whenever there is some operational error

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;