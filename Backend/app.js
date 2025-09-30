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