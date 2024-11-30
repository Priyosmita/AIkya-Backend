const { Campaign } = require('../models');

exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign({
      ...req.body,
      createdBy: req.user.id, // Assuming user is authenticated and `req.user` is set
    });
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully.', campaign: newCampaign });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('createdBy');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json({ message: 'Campaign updated successfully.', campaign });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
