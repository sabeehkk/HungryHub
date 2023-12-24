   import RestaurentModel from '../../models/restaurent.js' ;

// getRestaurents--------------------------------
    export const getRestaurents = async (req,res)=>{
        try {
            let data = await RestaurentModel.find({})
            res.json({data})
        } catch (error) {
           console.log(error); 
        }
    }