const router = require('express').Router();
const {
  savePayment,
  getPayments,
} = require('../controllers/paymentController');

router.route('/').get(getPayments);

router.route('/save').post(savePayment);

module.exports = router;
