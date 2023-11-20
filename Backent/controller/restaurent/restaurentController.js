// import restaurentModel from '../../models/restaurent.js'
import ProductModel  from '../../models/product.js';

// export const ProductAdd =async (req,res)=>{
//     try {
//          console.log(req.body);

//          const {productName,productImage,productPrice}=req.body

//         //  await ProductModel.save(productImage,productName,productPrice)

//         const product = await ProductModel.create({
//             productName,
//             productImage,
//             productPrice,
//           });
//           console.log('product added successfulley');
//      } catch (error) {
//         console.log(error.message);
//     }
// }

// export const ProductList =async (req,res)=>{
//     try {
//         const data =await ProductModel.find({})
//         console.log(data,'finding dataaaaaa');
//         res.json({data})
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const addProduct =async(req,res)=>{
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}