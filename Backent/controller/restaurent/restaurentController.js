// import restaurentModel from '../../models/restaurent.js'
import ProductModel  from '../../models/product.js';


export const addProduct =async(req,res)=>{
    try {
        console.log(req.body);
        const {productName, description,productPrice,category, images,restId}=req.body

        const newProduct = new ProductModel({
            productName,
            restaurent_id: restId,
            price:productPrice,
            category,
            images,
            description
                  })

                  await newProduct.save()
                  res.json({message:'success'})
    } catch (error) {
        console.log(error);
    }
}

export const ProductList = async (req,res)=>{
      try {
          const data = await ProductModel.find()
          console.log(data);
           res.json({data})
      } catch (error) {
        console.log(error.message);
      }
}
