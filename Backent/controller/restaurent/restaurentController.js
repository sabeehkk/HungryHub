// import restaurentModel from '../../models/restaurent.js'
import ProductModel from "../../models/product.js";
import CategoryModel from "../../models/category.js";

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { productName, description, productPrice, category, images, restId } =
      req.body;

    const newProduct = new ProductModel({
      productName,
      restaurent_id: restId,
      price: productPrice,
      category,
      images,
      description,
    });

    await newProduct.save();
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const ProductList = async (req, res) => {
  try {
    const data = await ProductModel.find();
    console.log(data);
    res.json({ data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { categoryName, restId } = req.body;
    const existCategory = await CategoryModel.findOne({
      name: categoryName,
      restaurent: restId,
    });
    if (existCategory) {
      res.status(400).send({
        error: true,
        message: "Category already exists",
      });
      console.log("category alere exist");
    } else {
      const newCategory = new CategoryModel({
        name: categoryName,
        restaurent: restId,
      });
      await newCategory.save();
      return res.json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

export const getCategories = async (req,res)=>{
  try {
    console.log('inside get category');
    const {id} =req.query
    console.log(id,'query iddd');
    const categoryData =await CategoryModel.find({
      is_deleted:false,
      restaurent:id
    })
    console.log(id,'restaiddd');
    console.log(categoryData,'categorydatas');
    res.status(200).json({
      status: 'success',
      categoryData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',

      message: 'Internal Server Error'
    });
  }
}

export const getRestaurentProducts = async (req,res)=>{
    try {
      const restId = req.query.id ;
      const productData = await ProductModel.find({
        isDeleted:false,
        restaurent_id:restId,
      })
      console.log(productData,'productDatas');
      if(productData.length>0){
        res.status(200).send({
          success:true,
          productData
        })
      }else{
        res.status(404).send({
          success:false,
          message:"Product Not Available"
        })
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"internal server Error"
      })
    }
}

export const getProductData =async (req,res)=>{
    try {
      console.log(req.query);
      const {id } =req.query ;
      const foundProduct = await ProductModel.findOne({_id:id}).populate('category')
      console.log(foundProduct,'foundproductttttt');
      if(foundProduct){
        res.status(200).send({success:true,product:foundProduct})
      }else{
        res.status(400).send({success:false,message:"product not found"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({success:false,message:"internal server error"})
    }
}