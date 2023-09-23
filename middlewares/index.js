const notFoundMiddleware = require('./not-found')
const errorHandlerMiddlware = require('./error-handler')
const authMiddleware = require('./auth')

module.exports = { notFoundMiddleware, errorHandlerMiddlware, authMiddleware }
