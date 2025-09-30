const mongoose = require('mongoose');
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
}

const dbUrl = process.env.DB_URL;
const flatOwners = require('../schema/flatOwners');
const FlatOwners = require('./FlatOwners');

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedFlatOwners = async () => {
    try {
        await flatOwners.deleteMany({});
        await flatOwners.insertMany(FlatOwners);
        console.log("Flat Owners Seeded");
    }
    catch (err) {
        console.log(err);
    }
}
seedFlatOwners().then(() => {
    mongoose.connection.close();
});