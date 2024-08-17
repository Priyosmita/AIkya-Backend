const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profilePicture: String,
  name: String,
  about: String,
  experience: String,
  certifications: [String],
  skills: [String],
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
