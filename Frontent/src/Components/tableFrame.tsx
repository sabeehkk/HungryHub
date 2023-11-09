import React from 'react';
import { Link } from 'react-router-dom';

import {
  AdminSideRestaurentModel,
    AdminSideTableFrameProps
} from '../models/models'

function TableFrame  ({
    heading,
    data,
    handleAction,
    role
}:AdminSideTableFrameProps ){
      const [id,setId]=useState("")
      const [status,setStautus]= useState("")

      const handleClick =(id:string,status:string,message:string)=>{
        handleAction(id,status,message) ;
      };

      const handleStatus =(id:string,status:string)=>{
        if(status==='reject'){
            setId(id)
            setStatus(status)
        }else{
          handleClick(id,status,"")
        }
      }

      const submitMessage =()=>{
        handleClick(id,status)
      }

      return(
        <div></div>
      )

   
}

export default TableFrame


