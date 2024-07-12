import User from "../models/user.models.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const fillteredusers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(fillteredusers);
    } catch (error) {
        console.log(`getting users failed due to ${error.message}`);
        res.status(500).json({ error: "Internal server error." });
    }
}