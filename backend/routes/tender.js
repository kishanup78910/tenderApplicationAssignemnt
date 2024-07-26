const express = require('express');
const Tender = require('../models/Tender');
const router = express.Router();

router.post('/create-tender', async (req, res) => {
  const tender = new Tender(req.body);
  await tender.save();
  res.status(201).send(tender);
});




router.get('/', async (req, res) => {
  const tenders = await Tender.find();
  res.send(tenders);
});

module.exports = router;
