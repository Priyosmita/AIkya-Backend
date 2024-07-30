// all schemas are present in models

// db for user profile
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: String,
  experience: String,
  certifications: String,
  skills: String,
  profilePicture: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = mongoose.model('Profile', ProfileSchema);