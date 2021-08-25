module.exports = function (err, req, res, next) {
    if (err) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Unexpected error!" });
}