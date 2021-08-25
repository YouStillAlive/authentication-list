class ApiError extends Error {
    constructor(status = 404, message = "Error!") {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ApiError;