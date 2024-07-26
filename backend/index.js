
const express = require("express")
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app =express();
app.use(cors());
app.use(bodyParser.json());


const mongoURI = 'mongodb+srv://kishanup789:IRvoXfCWR8qVY3Of@cluster2.t36fu2j.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const tenderRoutes = require("./routes/tender");
const bidRoutes = require("./routes/bid");

app.use('/api/tenders',tenderRoutes);
app.use('/api/bids',bidRoutes)

app.listen(3001,()=>{
  console.log("Server is up and running 3001");
})