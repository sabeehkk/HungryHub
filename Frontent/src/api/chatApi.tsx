import { chatAxios } from "../axios/axios";

export const getChatsAPI = async (id) => {
    console.log(id,'getChatsAPI');
  try {
    const response = await chatAxios.get(`/${id}`);
    console.log(response.data,'insideGetChats api');
      return response.data.chats;
  } catch (error) {}
};

export const createChatAPI = async (userId, ownerId) => {
  try {
    await chatAxios.post(`/`, { userId, ownerId});
  } catch (error) {}
};
