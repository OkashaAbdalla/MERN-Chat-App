import mongoose from "mongoose";

// Define simple message schema for direct messaging
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    text: {
      type: String,
      trim: true, // Remove extra spaces
      maxlength: 1000, // Limit text length to 1000 characters
      
    },
    imageUrl: {
      type: String,
      trim: true, // Remove extra spaces
    },
  },
  { timestamps: true }
);

// Create and export the Message model
const messageModel = mongoose.model("message", messageSchema);

export default messageModel;