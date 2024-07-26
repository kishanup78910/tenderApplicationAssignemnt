const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  name: String,
  description: String,
  startTime: Date,
  endTime: Date,
  bufferTime: Number,
});

const Tender = mongoose.model('Tender', tenderSchema);
module.exports = Tender;
