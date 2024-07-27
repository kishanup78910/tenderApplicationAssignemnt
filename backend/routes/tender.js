const express = require('express');
const Tender = require('../models/Tender');
const router = express.Router();

router.post('/create-tender', async (req, res) => {
  const tender = new Tender(req.body);
  await tender.save();
  res.status(201).send(tender);
});

router.get('/:id', async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) {
    return res.status(404).send({ message: 'Tender not found' });
  }
  res.send(tender);
});




router.get('/', async (req, res) => {
  const tenders = await Tender.find();
  res.send(tenders);
});

module.exports = router;
