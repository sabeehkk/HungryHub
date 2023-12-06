import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'

const VerifyToken = async (req,res,next)=>{
    try{
    const token = req.headers.authorization;
    console.log('token generatinggggggggg',token)
    if(!token){
        return res
        .status(401)
        .json({message:'Authentication token is missing or invalid.'});
    }
    const tokenWithoutBearer = token.replace('Bearer ', '');
    console.log(tokenWithoutBearer,'token without bearerrrrrrrrrrrr');
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET,async (err,decoded) => {
        console.log(decoded, 'DECODED DATA');
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        if(!decoded.role === 'user'){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(decoded.user,'DECODED USER')
        const userData = await userModel.findOne({_id:decoded.user, status: true} );
        console.log(decoded.user, 'usss', userData)
        if(!userData){
            return res.status(401).json({ message: 'Access Denied: Your account has been temporarily blocked' });
        }
        next();
    })
} catch (error) {
    console.log(error);
}
}

export default VerifyToken