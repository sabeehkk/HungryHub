import OrderModel from '../../models/order.js'
import EmployeeModel from '../../models/employee.js'
export const getEmplOrders= async (req, res) => {
    try {
        console.log(req.query,'getEmplOrders is called');
      const id = req.query.id;
      const ordersDetails = await OrderModel.find({
        // $or: [
        //   { employeeId: id },
        //   // { "item.employeeId._id": { $exists: false } },
        //   { "item.orderStatus": "Preparing..." },
        // ],
      })
        .sort({ _id: -1 })
        .populate({
          path: "item.product",
          model: "product",
          populate: {
            path: "restaurent_id",
            model: "Restaurant",
          },
        })
        .populate("userId");
      if (ordersDetails) {
        res.status(200).send({
          success: true,
          ordersDetails,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "No orders found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }


  orderAccept:async(req,res)=>{
    try {
      const { orderId, emplId} = req.body
      await Orders.updateOne({_id:orderId},{
        $set:{
          employeeId:emplId
        }
      })
      res.status(200).send({
        success: true,
        message:"Please collect order"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  export const listEmployees = async (req, res) => {
    try {
      console.log('listEmploy is working');
       const listEmployees = await EmployeeModel.find({})
       res.status(200).send({
         success: true,
         listEmployees,
       });
    } catch (error) {
      console.log(error.message);
    }
  }