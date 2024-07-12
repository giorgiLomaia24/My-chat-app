import express from "express";
import { getUsersForSidebar } from "../controllers/users.controller.js";
import protectRoutes from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/",protectRoutes, getUsersForSidebar);

export default router;

