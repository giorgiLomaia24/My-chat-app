import User from "../models/user.models.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`Getting users failed due to: ${error.message}`);
        res.status(500).json({ error: "Internal server error." });
    }
}



export const getUsersBySearch = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { searchQuery } = req.query; 

        // Trim any whitespace from the search query
        const trimmedSearchQuery = searchQuery ? searchQuery.trim() : '';

        console.log('Received Search Query:', trimmedSearchQuery);

        let searchCriteria = { _id: { $ne: loggedInUserId } }; 

        if (trimmedSearchQuery) {
            searchCriteria.fullName = { $regex: new RegExp(trimmedSearchQuery, 'i') }; 
        }
        const filteredUsers = await User.find(searchCriteria).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`Failed to get users due to: ${error.message}`);
        res.status(500).json({ error: "Internal server error." });
    }
};
