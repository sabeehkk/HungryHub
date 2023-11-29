import adminModel from '../../models/admin.js';
import userModel from '../../models/user.js'
import restaurentModel from '../../models/restaurent.js' 
import employeeModel from '../../models/employee.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const LIMIT=10

//RESTAURENT MANAGEMENT----
export const restaurentList = async (req, res) => {
    try {
      console.log('restaurent lsit');
      const PAGE = req?.query?.page
        ? req.query.page >= 1
          ? req.query.page
          : 1
        : 1;
      const SKIP = (PAGE - 1) * LIMIT;
  
      const restaurentData = await restaurentModel
        .find()
        .sort({ _id: -1 })
        .skip(SKIP)
        .limit(LIMIT);
        
      const TotalSize = await restaurentModel.countDocuments();
      const size = Math.ceil(TotalSize / LIMIT);
  
      return res.json({ message: "success", restaurentData, size });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };

  
export const restaurentUnblock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await restaurentModel.updateOne(
        { _id: id },
        { $set: { status: true } }
      );
  
      if (result.modifiedCount > 0) {
        return res.json({ message: "restaurent Un blocked!!" });
      }
      return res.status(404).json({ message: "User not found", error: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };
  
  export const restaurentBlock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await restaurentModel.updateOne(
        { _id: id },
        { $set: { status: false } }
      );
      if (result.modifiedCount > 0) {
        return res.json({ message: "Restaurent Blocked!!" });
      }
      return res.status(404).json({ message: "User not found", error: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };
  
  //EMPLOYEE MANAGEMENT----
export const employeeList = async (req, res) => {
    try {
      console.log('employee lsit');
      const PAGE = req?.query?.page
        ? req.query.page >= 1
          ? req.query.page
          : 1
        : 1;
      const SKIP = (PAGE - 1) * LIMIT;
  
      const employeeData = await employeeModel
        .find()
        .sort({ _id: -1 })
        .skip(SKIP)
        .limit(LIMIT);
        // console.log('employeedataaaaaaaaaaaa',employeeData);
        
      const TotalSize = await employeeModel.countDocuments();
      const size = Math.ceil(TotalSize / LIMIT);
  
      return res.json({ message: "success", employeeData, size });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };

  
export const employeeUnblock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await employeeModel.updateOne(
        { _id: id },
        { $set: { status: true } }
      );
  
      if (result.modifiedCount > 0) {
        return res.json({ message: "Success" });
      }
      return res.status(404).json({ message: "User not found", error: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };
  
  export const employeeBlock = async (req, res) => {
    try {
      const id = req.params.id;
      let result = await employeeModel.updateOne(
        { _id: id },
        { $set: { status: false } }
      );
      if (result.modifiedCount > 0) {
        return res.json({ message: "Success" });
      }
      return res.status(404).json({ message: "User not found", error: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: true });
    }
  };
  