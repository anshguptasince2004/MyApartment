const express = require('express');
const app = express();
const FlatOwners = require('./schema/flatOwners');
const PaymentRecords = require('./schema/paymentRecords');
const mongoose = require('mongoose');
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: path.resolve(__dirname, "./.env") });
}

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json());

//All the comments I have added are done manually, not by any AI tool

//For adding due amount every month to selected flats
app.patch('/home/addDue', async (req, res) => {
    try {
        const { FlatNo } = req.body;
        await FlatOwners.updateMany(
            { FlatNo: { $in: FlatNo }, status: 'occupied' },
            {
                $inc: { DueAmount: 800 }
            });
        await FlatOwners.updateMany(
            { FlatNo: { $in: FlatNo }, status: 'vacant' },
            {
                $inc: { DueAmount: 600 }
            });
        res.send({ message: 'Due amounts updated successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// For editing flat owner details
app.patch('/home/:flatNo/edit', async (req, res) => {
    const { flatNo } = (req.params);
    const updatedData = req.body;
    const owner = await FlatOwners.findOneAndUpdate({FlatNo: (flatNo)}, updatedData, { new: true });
    if (!owner) {
        return res.status(404).send('Flat owner not found');
    }
    res.send(owner);
});

// For updating due amount when paid
app.patch('/home/:flatNo/paid', async (req, res) => {
    const { flatNo } = (req.params); 
    const amountPaid = req.body.amountPaid;
    if(!amountPaid || amountPaid <= 0) {
        return res.status(400).send('Invalid amount paid');
    }
    PaymentRecords.FlatNo = Number(flatNo);
    const owner = await FlatOwners.findOneAndUpdate({ FlatNo: Number(flatNo) }, { $inc: {DueAmount: -amountPaid} }, { new: true });
    PaymentRecords.PaymentHistory.push({ Amount: amountPaid });
    await PaymentRecords.save();
    if (!owner) {
        return res.status(404).send('Flat owner not found');
    }
    res.send(owner);
});

// For fetching all flat owners
app.get('/home', async (req, res) => {
    const owners = await FlatOwners.find({});
    res.send(owners);
});

app.get('/', (req, res) => {
    res.send('Welcome to MyApartment Backend');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});