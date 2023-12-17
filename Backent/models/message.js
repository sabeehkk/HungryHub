import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
     },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("Message", messageSchema);

export default message;