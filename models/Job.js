const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company is required'],
      maxlength: [50, 'Company must not exceed 50 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      maxlength: [100, 'Position must not exeed 100 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'decline', 'interview'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
