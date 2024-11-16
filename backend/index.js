import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieSession from "cookie-session";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies from requests
app.use(express.json()); // Parse incoming JSON data (important for POST/PUT requests)

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware should be added **after** all routes
app.use(errorMiddleware); // Add the error handler middleware at the end

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
