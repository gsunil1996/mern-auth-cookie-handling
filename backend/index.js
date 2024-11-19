import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import helmet from "helmet";
import cookieSession from "cookie-session";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Set CSP to allow all sources
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["*"], // Allow all sources
      scriptSrc: ["*"], // Allow scripts from all sources
      connectSrc: ["*"], // Allow connections to all sources
      imgSrc: ["*"], // Allow images from all sources
      styleSrc: ["*"], // Allow styles from all sources
    },
  })
);

// Set CSP to allow scripts from self and https://vercel.live
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"], // Disallow all sources by default
      scriptSrc: ["'self'", "https://vercel.live"], // Allow scripts from self and the specified domain
      connectSrc: ["'self'", "https://vercel.live"], // Allow connections to the specified domain
      imgSrc: ["'self'", "data:"], // Allow images from self and inline data URIs
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // Allow styles from self and Google Fonts
    },
  })
);

app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON data

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware should be added after all routes
app.use(errorMiddleware); // Error handler middleware

// Start server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
