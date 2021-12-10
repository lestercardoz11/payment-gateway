const router = require('express').Router();
const {
  savePayment,
  getPayments,
  getPayment,
} = require('../controllers/paymentController');

router.route('/').get(getPayments);

router.route('/:id').get(getPayment);

router.route('/save').post(savePayment);

module.exports = router;
