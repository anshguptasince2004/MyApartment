const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const flatOwnersSchema = new Schema({
    Id : Number,
    OwnerName : String,
    FlatNo : Number,
    PhoneNo : Number,
    DueAmount : Number,
});
module.exports = mongoose.model('Flat Owners', flatOwnersSchema);