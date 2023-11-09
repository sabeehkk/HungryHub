import axios from "axios"
import { adminAxios } from "../axios/axios"

export const usersData = async (page:number)=>{
    const response =await adminAxios.get(`/users`,{
        params:{
            page,
        }
    })
    return {
        usersData:response?.data?.userData,
        // size:response?.data?.size ?
    }
}

export const userActionApi =async(id,action)=>{
     await adminAxios.patch(`/users${id}/${action}`)
}