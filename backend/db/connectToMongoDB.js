import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Database connection error:", err);
  }
};

export default connectToMongoDB;
