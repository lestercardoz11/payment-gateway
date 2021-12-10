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
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  address: {
    type: String,
  },
  card: {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    expiry: {
      type: String,
    },
    securityCode: {
      type: Number,
    },
  },
  amount: {
    omr: {
      type: String,
    },
    usd: {
      type: String,
    },
  },
});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
