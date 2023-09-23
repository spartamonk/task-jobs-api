const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddlware = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  }
  // test res for mongoose errs
  res.status(customError.statusCode).json({ success: false, err })
  // response
  // res
  //   .status(customError.statusCode)
  //   .json({ success: false, msg: customError.msg })
}

module.exports = errorHandlerMiddlware
