import CategoryModel from "../../models/category.js";
import RestaurentModel from '../../models/restaurent.js'

//getCategories--------------------------------
export const  getCategories =async(req,res) => {
    try {
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
            res.status(200).json({
                success:true,
                categories
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}
// getRestWithCategory--------------------------------
export const getRestWithCategory = async (req, res) => {
    try {
        const { catName } = req.query;
        const categoryNames = catName.split(',');
        let restaurants = await CategoryModel.find({ name: { $in: categoryNames } }).populate('restaurent');
        const uniqueRestaurantIds = new Set();
        restaurants = restaurants.filter(restaurant => {
            const restaurantId = restaurant.restaurent._id.toString();
            if (uniqueRestaurantIds.has(restaurantId)) {
                return false; 
            } else {
                uniqueRestaurantIds.add(restaurantId);
                return true;
            }
        });
        res.status(200).json({
            success: true,
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};