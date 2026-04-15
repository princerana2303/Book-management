const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error("MONGO_URL is not defined in backend/.env");
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
