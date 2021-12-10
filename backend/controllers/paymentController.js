const Payment = require('../models/payment.model');

const savePayment = (req, res, next) => {
  const { user, address, card, amount } = req.body;

  const payment = new Payment({
    user,
    address,
    card,
    amount,
  });

  payment
    .save()
    .then((item) =>
      res.status(201).json({
        status: 1,
        message: 'Payment successfully registered!',
        data: {
          _id: payment._id,
        },
      })
    )
    .catch((err) => {
      res.status(400).json({ status: 0, message: 'Invalid payment data' });
    });
};

const getPayments = async (req, res, next) => {
  const payments = await Payment.find({});
  return res.status(200).json(payments);
};

function getSingularResponse(err, foundObject) {
  if (err) {
    this.status(500).json({ error: err.message });
  } else {
    if (foundObject === null) {
      this.status(404).json({ error: 'Nothing found by this ID.' });
    } else {
      this.status(200).json(foundObject);
    }
  }
}

const getPayment = (req, res) => {
  var id = req.params.id;

  Payment.findOne({ _id: id }, getSingularResponse.bind(res));
};

module.exports = {
  getPayment,
  getPayments,
  savePayment,
};
