import messageModel from "../../models/message.js";

export const addMessage = async (req, res) => {
  console.log(req.body,'addMessage function called');
  try {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({
      chatId,
      senderId,
      text,
    });

    const result = await message.save();

    return res.json({ message: "success", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  console.log('inside getMessage function called');
  try {
    const result = await messageModel.find({ chatId: req.params.chatId });
    res.json({ message: "success", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
