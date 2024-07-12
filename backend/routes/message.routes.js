import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoutes from "../middleware/protectRoute.js";


const router = express.Router();

router.get("/:id", protectRoutes,getMessages);
router.post("/send/:id",protectRoutes, sendMessage)

export default router;




