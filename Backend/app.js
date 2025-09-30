const express = require('express');
const app = express();
const FlatOwners = require('./schema/flatOwners');
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

app.patch('/home/:flatNo', async (req, res) => {
    const { flatNo } = (req.params);
    const newDueAmount = req.body.DueAmount;
    const owner = await FlatOwners.findOneAndUpdate({ FlatNo: Number(flatNo) }, { DueAmount: newDueAmount }, { new: true });
    if (!owner) {
        return res.status(404).send('Flat owner not found');
    }
    res.send(owner);
});

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