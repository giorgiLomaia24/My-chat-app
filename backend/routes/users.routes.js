import express from "express";
import { getUsersBySearch, getUsersForSidebar } from "../controllers/users.controller.js";
import protectRoutes from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoutes, getUsersForSidebar);
router.get('/search', protectRoutes, getUsersBySearch);

export default router;

