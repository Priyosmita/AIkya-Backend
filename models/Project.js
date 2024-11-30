const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
      enum: ['Tech', 'Health', 'Education', 'Finance', 'Other'],
      required: true,
    },
    motive: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    additionalInfo: {
      type: String,
    },
    equityOfferings: [
      {
        amount: {
          type: Number,
          min: 0,
        },
        equity: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Project', projectSchema);
