import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message: {
        type: String,
        required :false
    },
    img: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;