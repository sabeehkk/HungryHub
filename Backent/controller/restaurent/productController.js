   import RestaurentModel from '../../models/restaurent.js' 

    export const getRestaurents = async (req,res)=>{
        console.log('inside get restaurent');
        try {
            let data = await RestaurentModel.find({})
            console.log(data,'results of restaurent');
            // if(result){
            //     res
            // }
            res.json({data})
        } catch (error) {
            
        }
    }