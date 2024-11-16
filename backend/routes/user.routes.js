import express from "express";
import {
  getUsersForSidebar,
  getCurrentUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/me", protectRoute, getCurrentUser);

export default router;
