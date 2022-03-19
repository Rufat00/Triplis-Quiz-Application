module.exports = function error (message, status) {
    return {
        isError: true,
        status: status,
        message: message
    }
}