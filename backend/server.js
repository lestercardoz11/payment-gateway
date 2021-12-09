const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const source = process.env.DB_URL;

mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('DB connected.');
});

const app = express();
app.use(express.json());

const paymentRoute = require('./routes/paymentRoute');
app.use('/payments', paymentRoute);

app.listen(5000, function () {
  console.log('listening on 5000');
});
