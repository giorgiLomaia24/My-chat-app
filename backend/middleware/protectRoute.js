import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoutes = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({error: "Unauthorized - no token provided."})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            res.status(401).json({error: "Unauthorized - invalid token."})
        }

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log(`middleware failed due to  ${error.message}`);
        res.status(500).json({error: "Internal server error."})
    }
}

export default protectRoutes;