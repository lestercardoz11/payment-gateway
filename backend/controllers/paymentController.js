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

module.exports = {
  savePayment,
  getPayments,
};
