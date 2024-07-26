const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  tenderId: mongoose.Schema.Types.ObjectId,
  companyName: String,
  bidTime: Date,
  bidCost: Number,
  isLastMinute: Boolean,
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
