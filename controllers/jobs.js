const Job = require('../models/Job')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const getAllJobs = async (req, res) => {
  const { userID } = req.user
  const jobs = await Job.find({ createdBy: userID }).sort('createdAt')
  res.status(StatusCodes.OK).json({ success: true, jobs })
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ success: true, job })
}
const getJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
  } = req
  const job = await Job.findOne({ _id: jobID, createdBy: userID })
  if (!job) {
    throw new NotFoundError(`No job exists with id ${jobID}`)
  }
  res.status(StatusCodes.OK).json({ success: true, job })
}
const updateJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
    body: { position, company },
  } = req
  if (position === '' || company === '') {
    throw new BadRequestError('Please provide position and company')
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job exists with id ${jobID}`)
  }
  res.status(StatusCodes.OK).json({ success: true, job })
}
const deleteJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
  } = req
  const job = await Job.findOneAndRemove({ _id: jobID, createdBy: userID })
  if (!job) {
    throw new NotFoundError(`No job exists with id ${jobID}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
