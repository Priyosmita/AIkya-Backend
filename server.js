const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

const uploadMultiple = multer({
  storage,
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'certifications[]', maxCount: 10 } // Adjust as needed
]);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rijuraj:Riju4929!@aikya.htvianz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const profileSchema = new mongoose.Schema({
  profilePicture: String,
  name: String,
  about: String,
  experience: String,
  certifications: [String],
  skills: [String],
});

const projectSchema = new mongoose.Schema({
  name: String,
  website: String,
  type: String,
  industry: String,
  details: String,
  startedIn: String,
  yearlyRevenue: Number,
  monthlySales: Number,
  grossMargin: Number,
  netMargin: Number,
  ebitda: Number,
  skus: Number,
  originalAsk: Number,
  equityOffered: Number,
  debtAmount: Number,
  images: String
});

const Profile = mongoose.model('Profile', profileSchema);
const Project = mongoose.model('Project', projectSchema);

// Profile routes
app.post('/api/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, about, experience, certifications, skills } = req.body;
    const profilePicture = req.file ? req.file.path.replace('uploads/', '') : req.body.profilePicture;

    // Parse skills as JSON if it's a string
    const parsedSkills = Array.isArray(JSON.parse(skills)) ? JSON.parse(skills) : [];

    // Parse certifications if needed
    const parsedCertifications = certifications ? JSON.parse(certifications) : [];

    // Update or create the profile
    const profile = await Profile.findOneAndUpdate({}, {
      name,
      about,
      experience,
      certifications: parsedCertifications,
      skills: parsedSkills, // Ensure skills are saved as an array
      profilePicture
    }, { upsert: true, new: true });

    res.status(201).send(profile);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Failed to update profile' });
  }
});




app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne({});
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Project routes
app.post('/api/project', upload.single('images'), async (req, res) => {
  try {
    const { name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount } = req.body;
    const images = req.file ? req.file.path : req.body.images;

    const project = new Project({ name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount, images });
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    console.error('Error Saving Project:', error);
    res.status(400).send(error);
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT route to update a project
app.put('/api/project/:id', upload.single('images'), async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount } = req.body;
    const images = req.file ? req.file.path : req.body.images;

    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount, images
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).send('Project not found');
    }

    res.send(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).send('Server error');
  }
});

app.delete('/api/project/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Serve static files
app.use('/uploads', express.static('uploads'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});