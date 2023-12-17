import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    employeeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    }
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatSchema);

export default chat;
