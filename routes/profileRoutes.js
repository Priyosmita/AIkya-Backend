const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, about, experience, certifications, skills } = req.body;
    const profilePicture = req.file ? req.file.path : req.body.profilePicture;

    const profile = await Profile.findOneAndUpdate({}, {
      name, about, experience, certifications, skills, profilePicture
    }, { upsert: true, new: true });

    res.status(201).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne({});
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
