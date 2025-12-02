const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
  FlatNo: { type: Number, required: true, index: true },
  PaymentHistory: [{
    Amount: { type: Number, required: true },
    PaidOn: { type: Date, default: Date.now },
    RemainingDue: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('Payment', paymentSchema);