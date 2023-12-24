// import restaurentModel from '../../models/restaurent.js'
import ProductModel from "../../models/product.js";
import CategoryModel from "../../models/category.js";
import RestaurentModel from '../../models/restaurent.js'
const LIMIT=6
// addProduct-----------------------------
export const addProduct = async (req, res) => {
  try {
    const { productName, description, productPrice, category, images, restId,variants } = req.body;
    const newProduct = new ProductModel({
      productName,
      restaurent_id: restId,
      variants,
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
// ProductList----------------------
export const ProductList = async (req, res) => {
  try {
    const data = await ProductModel.find({isDeleted:false});
    res.json({ data });
  } catch (error) {
    console.log(error.message);
  }
};

// addCategory--------------------------

export const addCategory = async (req, res) => {
  try {
    const { categoryName, restId } = req.body;
    const lowerCaseCategoryName = categoryName.toLowerCase() ;
    const existCategory = await CategoryModel.findOne({
      name: lowerCaseCategoryName,
      restaurent: restId,
    });
    if (existCategory) {
      res.status(400).send({
        error: true,
        message: "Category already exists",
      });
    } else {
      const newCategory = new CategoryModel({
        name: lowerCaseCategoryName,
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
// getCategories
export const getCategories = async (req, res) => {
  try {
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;
    const SKIP = (PAGE - 1) * LIMIT;
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Category ID is required',
      });
    }
    if (id === 'undefined') {
      return res.status(400).json({
        
      });
    }
    const categoryData = await CategoryModel.find({
      is_deleted: false,
      restaurent: id,
    })
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);
    const TotalSize = await CategoryModel.countDocuments({ is_deleted: false, restaurent: id });
    const size = Math.ceil(TotalSize / LIMIT);
    res.status(200).json({
      status: 'success',
      categoryData,
      size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
// getRestaurentProducts--------------------------------
export const getRestaurentProducts = async (req,res)=>{
    try {
      const PAGE = req?.query?.page
    ? req.query.page >= 1
      ? req.query.page
      : 1
    : 1;
    const SKIP = (PAGE - 1) * LIMIT;
      const restId = req.query.id ;
      if (restId === 'undefined') {
        return res.status(400).json({
        });
      }
      const productData = await ProductModel.find({
        isDeleted:false,
        restaurent_id:restId,
      })
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);
      const TotalSize = await ProductModel.countDocuments({isDeleted:false});
      const size = Math.ceil(TotalSize / LIMIT);
      if(productData.length>0){
        res.status(200).send({
          success:true,
          productData,size
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
// getProductData--------------------------------
export const getProductData =async (req,res)=>{
    try {
      console.log(req.query);
      const {id } =req.query ;
      const foundProduct = await ProductModel.findOne({_id:id}).populate('category')
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
//updateProduct-----------------------------
export const updateProduct = async (req,res)=>{
     try {
        const {productName,description,category,images,productId,variants}=req.body
        await ProductModel.updateOne({_id:productId},
          {
            $set:{
            productName,description,category,images,variants
          }
        }
       ).then(()=>{
        res.status(200).send({
          success:true,
          message:"Product Editted Successfully"
        })
       }).catch((err)=>{
        res.status(404).send({
          success:false,
          message:"something went wrong"
        })
       })
     } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"internal server error"
      })
     }
}
// deleteProduct----------------------------
export const deleteProduct =async(req,res)=>{
     try {
       const {proId} = req.body ;
       const productToDelete = await ProductModel.findOne({ _id: proId });
    if (!productToDelete) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
     const result =  await ProductModel.updateOne(
        {_id:proId},
        {$set:{
          isDeleted:true,
        },
      }
       )
       .then(()=>{
        res.status(200).send({
          success:true,
          message:"product Deleted "
        })
       }).catch(()=>{
        res.status(404).send({
          success:false,
          message:"something went wrong"
        })
       })
     } catch (error) {
      res.status(500).send({
        success:false,
        message:"Internal server error" ,
      })
      console.log(error);
     }
  }
// editCategory-----------------------
export const editCategory= async(req,res)=>{
  try {
    const { categoryName, image, categoryId, restId } = req.body
    const existCategory = await CategoryModel.findOne({
      name: categoryName,
      restaurent: restId,
     });
    if(existCategory){
      const existId = existCategory._id.toString()
      if(existId === categoryId){
        await CategoryModel.updateOne({_id:categoryId},{$set:{
          image,
        }})
        res.status(200).json({
          success:true,
          message:"Category edited success"
        })
      }else{
        res.status.json({
          success:false,
          message:"Category already exists"
      })
    }
    }else{await CategoryModel.updateOne({_id:categoryId},{
      $set:{
        name:categoryName,
      }
    })
    res.status(200).json({
      success:true,
      message:"Category edited success"
    })}
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}
// deleteCategory------------------------
export const deleteCategory = async(req,res)=>{
  try {
    const { catId } = req.body
    const isProduct = await ProductModel.find({'category._id':catId})
    if (isProduct.length > 0) {
      return res.status(409).send({
        message: 'Category has associated products. Do you want to delete the products and the category?',
        confirmationRequired: true
      });
    }
    await CategoryModel.updateOne({_id:catId},{$set:{
      is_deleted:true
    }})
    res.status(200).send({
      success:true,
      message:"Category Deleted"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Server error"
    })
  }
}
// getResProfile---------------------------------
export const getResProfile= async(req,res)=>{
  try {
    const restId = req.query.id
    const restData = await RestaurentModel.findOne({_id:restId})
    if(restData){
      res.status(200).send({
        success:true,
        restData,
      })
    }else{
      res.status(404).send({
        success:false,
        message:"Restaurant data Not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Server error"
    })
  }
}