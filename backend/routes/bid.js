const express = require('express');
const Bid = require('../models/Bid');
const Tender = require('../models/Tender');
const router = express.Router();

router.post('/submit-bid', async (req, res) => {
  try {
    const { tenderId, companyName, bidCost } = req.body;
    const tender = await Tender.findById(tenderId);
    if (!tender) {
      return res.status(404).send({ error: 'Tender not found' });
    }

    const bidTime = new Date();
    const tenderEndTime = new Date(tender.endTime);
    const bufferTimeInMillis = tender.bufferTime * 60000;
    const isLastMinute = bidTime >= (tenderEndTime - bufferTimeInMillis);

    console.log(`Bid time: ${bidTime}`);
    console.log(`Tender end time: ${tenderEndTime}`);
    console.log(`Buffer time (ms): ${bufferTimeInMillis}`);
    console.log(`Is last minute: ${isLastMinute}`);

    if (isLastMinute) {
      tender.endTime = new Date(tenderEndTime.getTime() + bufferTimeInMillis);
      await tender.save();
      console.log(`Updated tender end time: ${tender.endTime}`);
    }

    const bid = new Bid({ tenderId, companyName, bidTime, bidCost, isLastMinute });
    await bid.save();
    res.status(201).send(bid);

  } catch (error) {
    console.error('Error submitting bid:', error);
    res.status(500).send({ error: 'Error submitting bid' });
  }
});

router.get('/tender/:tenderId', async (req, res) => {
  try {
    const { tenderId } = req.params;
    const bids = await Bid.find({ tenderId }).sort({ bidCost: 1 });
    res.send(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).send({ error: 'Error fetching bids' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bids = await Bid.find().sort({ bidCost: 1 });
    res.send(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).send({ error: 'Error fetching bids' });
  }
});

module.exports = router;
