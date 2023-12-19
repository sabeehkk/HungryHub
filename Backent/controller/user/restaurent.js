import CategoryModel from "../../models/category.js";

import RestaurentModel from '../../models/restaurent.js'

export const  getCategories =async(req,res) => {
    try {
      console.log('insided GET CATEGORY');
       const categories =  await CategoryModel.aggregate([
            {
                $group: {
                    _id: {
                      name: '$name',
                    },
                    count: { $sum: 1 },
                    categoryIds: { $push: '$_id' },
                  },
            },
          ])
            .exec()
            res.status(200).send({
                success:true,
                categories
            })
            // console.log(categories,'CATEGORY DATAAA');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Server Error"
        })
    }
}
export const getRestWithCategory = async (req, res) => {
    try {
        const { catName } = req.query;
        const categoryNames = catName.split(',');

        let restaurants = await CategoryModel.find({ name: { $in: categoryNames } }).populate('restaurent');

        const uniqueRestaurantIds = new Set();
        restaurants = restaurants.filter(restaurant => {
            const restaurantId = restaurant.restaurent._id.toString();
            if (uniqueRestaurantIds.has(restaurantId)) {
                return false; // Skip this restaurant
            } else {
                uniqueRestaurantIds.add(restaurantId);
                return true; // Include this restaurant
            }
        });

        console.log(restaurants, 'restaurants ids');
        res.status(200).send({
            success: true,
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server Error"
        });
    }
};


// export const  getRestWithCategory =async(req,res)=>{
//     try {
//         const { catName } = req.query
//         const categoryNames = catName.split(',');
//           let  restaurants = await CategoryModel.find({ name: { $in: categoryNames }}).populate('restaurent');
//           console.log(restaurants,'restaurants idss');
//         // const existingRestaurants = await CategoryModel.find({ name: { $in: categoryNames } }).populate('restaurent');
// //         const existingRestaurantIds = existingRestaurants.map((restaurant) => restaurant.restaurent._id);
// //   const newRestaurants = await CategoryModel.find({
// //             name: { $in: categoryNames },
// //             'restaurent': { $nin: existingRestaurantIds }
// //         }).populate('restaurent');
// //           console.log(newRestaurants,'existing restaunrat');
//           res.status(200).send({
//             success:true,
//             restaurants,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Server Error"
//         })
//     }
// }



