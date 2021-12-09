var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  user: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  address: {
    line1: {
      type: String,
    },
    line2: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
  },
  card: {
    number: {
      type: Number,
    },
    expiry: {
      type: String,
    },
  },
  amount: {
    type: String,
  },
});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
