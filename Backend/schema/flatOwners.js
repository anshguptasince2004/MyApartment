const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flatOwnersSchema = new Schema({
    Id : Number,
    OwnerName : String,
    FlatNo : Number,
    PhoneNo : String,
    DueAmount : Number,
    status : {
        type: String,
        enum: ['vacant', 'occupied'],
        default: 'vacant'
    }
});
module.exports = mongoose.model('FlatOwner', flatOwnersSchema);