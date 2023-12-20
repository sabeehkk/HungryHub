import CartModel from '../../models/cart.js'
import ProductModel from '../../models/product.js'


export const addToCart =async (req,res)=>{
    console.log(req.body,'incoming datas in Add To Cart');
    const { productId, userId ,selectedVariant } = req.body;
    try {
      const product = await ProductModel.findOne({_id: productId }); 
      // console.log(product,'finded product');
      const userCart = await CartModel.findOne({ user: userId });
      console.log(userCart,'usercart find details');

      if (userCart) {
        console.log(userCart.restaurantId,'inside equalsssss both are matching');
           
        if(product.restaurent_id.equals(userCart.restaurantId)){
        const proExist = userCart.items.findIndex(
            (item) => item.productId == productId
          );
        if (proExist !== -1) {
          const varExist = userCart.items.find(item => item.variant === selectedVariant.name);
          if(varExist){
        await CartModel.updateOne(
            { user: userId, "items.productId": productId, "items.variant":selectedVariant.name },
            {
              $inc: {
                "items.$.quantity": 1,
                "items.$.price": selectedVariant.offerPrice,
              },
              
            }
          );
          res.status(200).send({
            success: true,
            message: "product added to cart",
          });
        }else{
          await CartModel.updateOne(
            { user: userId },
            {
              $addToSet: {
                "items": {
                  productId: product._id,
                  price: selectedVariant.offerPrice,
                  variant: selectedVariant.name
                },
              },
            }
          );
          res.status(200).send({
            success: true,
            message: "product added to cart",
          });
        }
        }else{
            await CartModel.updateOne(
                { user: userId },
                {
                  $addToSet: {
                    "items": {
                      productId: product._id,
                      price: selectedVariant.offerPrice,
                      variant: selectedVariant.name
                    },
                  },
                }
              );
              res.status(200).send({
                success: true,
                message: "product added to cart",
              });
        }
      }else{
        await CartModel.updateOne(
          { user: userId },
          {
             restaurantId:product.restaurent_id,
              items: {
                productId: product._id,
                price: selectedVariant.offerPrice,
                variant: selectedVariant.name
              },
          }
        );
        res.status(200).send({
          success: true,
          message: "product added to cart with updated restaurant",
        });
      }
      } else {
             await CartModel.create({
          user: userId,
          restaurantId:product.restaurent_id,
          items: [
            {
              productId: product._id,
              price: selectedVariant.offerPrice,
              variant: selectedVariant.name
            },
          ],
        })
            res.status(200).send({
                success:true,
                message:"product added to cart"
            })
        
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal server error", 
      });
    }
}

export const getCart = async (req,res)=>{
  try {
  console.log(req.query,'inside cart')

    const userId  = req.query.id
    const cartData = await CartModel.findOne({user:userId}).populate('items.productId')
    console.log(cartData.restaurantId,'cartDatass');
    if(cartData){
      res.status(200).send({
        success:true,
        cartData
      })
    }else{
      res.status(200).send({
        success:false,
        message:"Your Cart is empty"
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

export const changeQuantity =  async(req,res)=>{
  console.log('inside Change quantity');
  try {
    console.log(req.body);
    const {itemId, cartId, action, variant} = req.body
    const product = await ProductModel.findOne({ _id: itemId });
    const vrIndx = product.variants.findIndex(
      (item) => item.name == variant
    );
    if(action.increment){
      await CartModel.updateOne({_id:cartId, "items.productId":itemId, "items.variant":variant},{
        $inc: {
          "items.$.quantity": 1,
          "items.$.price": product.variants[vrIndx].offerPrice,
        },
      })
    }else if(action.decrement){
      await CartModel.updateOne({_id:cartId, "items.productId":itemId, "items.variant":variant},{
        $inc: {
          "items.$.quantity": -1,
          "items.$.price": -product.variants[vrIndx].offerPrice,
        },
      })
    }
    res.status(200).send({
      success: true,
      message: "quantityChanged",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}

export const cartTotal = async (req,res)=>{
  console.log(req.body);
  try {
    const { cartId, amount, grandTotal } = req.body
    await CartModel.updateOne({_id:cartId},{
      $set:{
        total:amount,
        grandTotal,
      }
    })
    res.status(200).send({
      success:true,
      message:"total updated"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"seerver error"
    })
  }
}

export const cancelCartItem =async (req,res)=>{
  try {
    const {itemId, cartId, variant} = req.body
    console.log(req.body);
    await CartModel.updateOne({_id:cartId},{
      $pull:{
         items: { productId: itemId, variant }
      }
    })
    res.status(200).send({
      success:true,
      message:"Item cancelled"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}