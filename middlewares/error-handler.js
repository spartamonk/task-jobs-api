const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddlware = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  }
  // test res for mongoose errs
  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = Object.values(err.errors)
      .map((i) => i.message)
      .join(', ')
  }
  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND
    customError.msg = `No job exists with id ${err.value}`
  }
  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `The ${Object.keys(
      err.keyValue
    )} already exists, please register or use a different ${Object.keys(
      err.keyValue
    )}`
  }
  res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.msg })
}

module.exports = errorHandlerMiddlware
