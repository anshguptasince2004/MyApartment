const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    FlatNo: Number,
    PaymentHistory: [{
        Amount: Number,
        PaidOn: {type: Date, default: Date.now},
        Month: {type: String, default: new Date().toISOString().slice(0, 7)},
    }]
});

module.exports = mongoose.model('Payment', paymentSchema);