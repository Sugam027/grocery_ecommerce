import jwt from "jsonwebtoken";
import 'dotenv/config';

const authAdmin = async(req, res, next) => {
    const { adminToken } = req.cookies;

    if(!adminToken){
        return res.json({success: false, message: "not authorized"})
    }

    try {
            const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);
            if(tokenDecode.email === process.env.ADMIN_EMAIL){
                next();
            }else{
                return res.json({success: false, message: "not authorized"})
            }
            
        } catch (error) {
            console.log(error.message);
            res.json({success: false, message: error.message})
            
        }
}

export default authAdmin