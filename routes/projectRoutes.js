const express = require('express');
const multer = require('multer');
const Project = require('../models/Project');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('images'), async (req, res) => {
  try {
    const { name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount } = req.body;
    const images = req.file ? req.file.path : req.body.images;

    const project = new Project({ 
      name, website, type, industry, details, startedIn, yearlyRevenue, monthlySales, 
      grossMargin, netMargin, ebitda, skus, originalAsk, equityOffered, debtAmount, images 
    });
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', upload.single('images'), async (req, res) => {
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
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
