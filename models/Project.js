// db for user projects
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: String,
  type: String,
  industry: String,
  details: String,
  images: String,
});

module.exports = mongoose.model('Project', ProjectSchema);