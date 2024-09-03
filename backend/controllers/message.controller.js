import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { v2 as cloudinary } from 'cloudinary';



export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    let { img } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find the conversation with both participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {resource_type : "auto"});
      img = uploadedResponse.secure_url;
    }

    // Create a new message
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      img: img
    });


    // Add the new message to the conversation
    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }



    // Return the new message as the response
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Sending message failed due to ${error.message}`);
    res.status(500).json({ error: "Internal server error." });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
      
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.log(`getting messages failed due to ${error.message}`);
    res.status(500).json({ error: "Internal server error." });
  }
}
