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

export const  getRestWithCategory =async(req,res)=>{
    try {
        const { catName } = req.query
        console.log(catName,'categoryName');
        const restaurants = await CategoryModel.find({name:catName}).populate('restaurent')
        // const ratings = await RestaurentModel.aggregate([
            // {
            //   $unwind: '$rating',
            // },
        //     {
        //       $group: {
        //         _id: '$_id',
        //         Name: { $first: '$Name' },
        //         // totalRating: { $sum: '$rating.rating' },
        //         // averageRating: { $avg: '$rating.rating' },
        //       },
        //     },
        //   ])
          res.status(200).send({
            success:true,
            restaurants,
            // ratings 
        });
        console.log(restaurants,'Restarent DATASSS');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Server Error"
        })
    }
}