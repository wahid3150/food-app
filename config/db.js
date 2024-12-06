const mongoose = require("mongoose");
const colors = require("colors");

require("dotenv").config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is not found in environment variable");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is connected successfully".bgBlue);
  } catch (error) {
    console.error(error, colors.bgRed);
    process.exit(1);
  }
};

module.exports = connectDB;
