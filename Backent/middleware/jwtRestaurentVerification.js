
import jwt from 'jsonwebtoken';

const VerifyToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization;
    console.log('token generatinggggggggg',token)
        if(!token){
            return res
            .status(401)
            .json({message:'Authentication token is missing or invalid.'});
        }
        const tokenWithoutBearer = token.replace('Bearer ','');
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET,async (err,decoded) => {
            console.log(decoded,'DeCODEDDDDDD')
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }
            // if(!decoded.role ==='admin'){
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }
            next();
        })
    } catch (error) {
        console.log(error);
    }
}

export default VerifyToken;















// import jwt from 'jsonwebtoken';
// import carOwnerSchema from '../models/carOwner/carOwner.js';
// import RestaurentModel from '../models/restaurent.js'

// const VerifyToken = async (req, res, next)=>{
//     try {
//         console.log('inside verify token');
//         const token = req.headers.authorization;
//     console.log('token generatinggggggggg',token)

//         if(!token){
//             return res
//             .status(401)
//             .json({message:'Unauthorized'});
//         }

//         const tokenWithoutBearer = token.replace('Bearer ', '');
//         jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, async (err, decoded) => {
//             console.log(decoded,'DECODED DATA');
//             if (err) { 
//               return res.status(401).json({ message: 'Unauthorized' });
//             }
//             if (decoded.role !== 'restaurent') {
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }

//             const resturentData = await RestaurentModel.findOne({_id:decoded.user , status:true})
//             if(!resturentData){
//                 return res.status(401).json({ message: 'Access Denied: Your account has been temporarily blocked' });
//             }
//             next();
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// const VerifyToken = async (req, res, next) => {
//     try {
//         console.log('inside verify token');
//         const token = req.headers.authorization;
//         console.log('token generatinggggggggg', token)

        // if (!token) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        // const tokenWithoutBearer = token.replace('Bearer ', '');
        // jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, async (err, decoded) => {
            // console.log(decoded, 'DECODED DATA');
            // if (err) {
            //     console.log(err,'errorrs found');
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }
            // console.log(decoded, 'DECODED DATA');
        

            // if (!decoded.role== 'restaurent') {
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }
            
            // const resturentData = await RestaurentModel.findOne({ _id: decoded.user, status: true })
            // if (!resturentData) {
            //     return res.status(401).json({ message: 'Access Denied: Your account has been temporarily blocked' });
            // }
            // next();
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default VerifyToken;
