import ChatModel from "../../models/chat.js";

export const createChat = async (req, res) => {
  try {
    console.log('createChat is called');
    console.log(req.body,'incoming datas');
    const { userId, ownerId } = req.body;
    const existed = await ChatModel.findOne({ userId, employeeId });
    if (existed) {
      return res.json({ message: "success" });
    }

    const newChat = new ChatModel({
      employeeId,
      userId,
    });
    const result = await newChat.save();
    return res.json({ message: "success", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userChats = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id,'userChats function called')

    // const chats = await ChatModel.find({userId:id}).populate('userId')
    const chats = await ChatModel.find({ userId: id }).populate("userId");

    console.log(chats,'chat list datas');
      // .find({
        // $or: [{ userId: id }, { employeeId: id }],
      // })
      // .sort({ _id: -1 })
      // .populate("userId")
      // .populate("employee");
      // console.log(chats,'chatssssssssss')

    return res.json({ message: "success", chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findChat = async (req, res) => {
  try {
    console.log('findchat is called');
    const chat = await ChatModel.findOne({
      member: { $all: [req.params.firstId, req.params.secondId] },
    });
    return res.json({ message: "success", chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
