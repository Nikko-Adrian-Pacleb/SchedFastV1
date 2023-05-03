const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEV
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
