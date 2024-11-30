const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/campaigns', campaignController.createCampaign);
router.get('/campaigns', campaignController.getCampaigns);
router.get('/campaigns/:id', campaignController.getCampaign);
router.put('/campaigns/:id', campaignController.updateCampaign);
router.delete('/campaigns/:id', campaignController.deleteCampaign);

module.exports = router;
