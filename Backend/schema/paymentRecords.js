const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    FlatNo: Number,
    PaymentHistory: [{
        Amount: Number,
        PaidOn: Date, 
    }]
});

module.exports = mongoose.model('Payment', paymentSchema);