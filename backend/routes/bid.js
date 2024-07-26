const express = require('express');
const Bid = require('../models/Bid');
const Tender = require('../models/Tender');
const router = express.Router();

router.post('/submit-bid', async (req, res) => {
  const { tenderId, companyName, bidCost } = req.body;
  const tender = await Tender.findById(tenderId);
  const bidTime = new Date();
  const isLastMinute = bidTime >= new Date(tender.endTime) - tender.bufferTime * 60000;
  if (isLastMinute) {
    tender.endTime = new Date(tender.endTime.getTime() + tender.bufferTime * 60000);
    await tender.save();
  }
  const bid = new Bid({ tenderId, companyName, bidTime, bidCost, isLastMinute });
  await bid.save();
  res.status(201).send(bid);
});
router.get('/tender/:tenderId', async (req, res) => {
  const { tenderId } = req.params;
  const bids = await Bid.find({ tenderId }).sort({ bidCost: 1 });
  res.send(bids);
});

router.get('/', async (req, res) => {
  const bids = await Bid.find().sort({ bidCost: 1 });
  res.send(bids);
});

module.exports = router;
