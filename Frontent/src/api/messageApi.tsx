import { messageAxios } from "../axios/axios";

export const getMessageAPI = async (chatId) => {
   console.log(chatId,'getMessageAPI is called');
  try {
    const response = await messageAxios.get(`/${chatId}`);
    return response.data?.result;
  } catch (error) {}         
};
    
export const sendMessage = async (chatId, senderId, text) => {
    console.log(chatId,senderId,text,'sendMessage api is called');
  try {
    const response = await messageAxios.post("/", { chatId, senderId, text });
    return response.data.result;
  } catch (error) {}
};
