import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUpUser = async (req, res) => {
    try {
        const { fullName,userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User name is Already taken." });
        }

        const salt = await bcryptjs.genSalt(10);
        const hasshedpassword = await bcryptjs.hash(password, salt);


        const maleProfilePic = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Male_Avatar.jpg";
        const femaleProfilePic = "https://www.kindpng.com/picc/m/378-3783625_avatar-woman-blank-avatar-icon-female-hd-png.png";

        const newUser = new User({
            fullName,
            userName,
            password : hasshedpassword,
            gender,
            profilePicture: gender === 'male' ? maleProfilePic : femaleProfilePic
        });

        if (newUser) {
            
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePicture: newUser.profilePicture
            });
            
        }

        
    } catch (error) {
        console.log(`signed in failed due to  ${error.message}`);
        res.status(500).json({error: "Internal server error."})
    }
}

export const loginUser = async (req, res) => {
     try {
         const { userName, password } = req.body;
         const user = await User.findOne({ userName });
         const ispasswordCorrect = await bcryptjs.compare(password, user?.password || "");

         if (!userName || !ispasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password."})
         }
         generateTokenAndSetCookie(user._id, res);

         res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePicture: user.profilePicture
        });

     } catch (error) {
        console.log(`log in failed due to  ${error.message}`);
        res.status(500).json({error: "Internal server error."})
     }
}

export const logOutUser = async (req, res) => {
    try {
         
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({message: "Logged out successfully."})
        
     } catch (error) {
        console.log(`log out in failed due to  ${error.message}`);
        res.status(500).json({error: "Internal server error."})
     }
}