import restaurentModel from '../../models/restaurent.js'

import bcrypt from 'bcrypt'


export const signup =async (req,res)=>{
    try {
        console.log('restaurentda',req.body);
        
    } catch (error) {
        console.log(error.message)
    }
}