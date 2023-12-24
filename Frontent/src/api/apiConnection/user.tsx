import { userAxios } from "../../axios/axios";

export const chat = async()=>{
    try {
        const response = await userAxios.get(`chat`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

export const chatSave = async(data)=>{
    try {
        const response = await userAxios.post(`saveChat`,data)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

export const socketCall = async(data)=>{
    try {
        const response = await userAxios.post(`socket`,data)
        return response
    } catch (error) {
        console.log(error.message);
    }
} 

// export {
//     chat,
//     chatSave,
//     socketCall
// }