import jwt from 'jsonwebtoken';
import "dotenv/config";

class adminController{
    // resgister user
    // async register(req, res){
    //     try{
    //         const {name, email, password} = req.body;
    
    //         if(!name, !email, !password){
    //             return res.json({success: false, message: "Some Details is missing"})
    //         }
    //         const existingUser = await User.findOne({email: email});
    
    //         if(existingUser){
    //             return res.json({success: false, message: "User already exists"})
    //         }
    //         const hashedPassword = await bcrypt.hash(password, 10);
    
    //         const user = await User.create({name, email, password: hashedPassword});
    
    //         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    
    //         res.cookie('token', token, {
    //             httpOnly: true, // prevent js to access
    //             secure: process.env.NODE_ENV === 'production', // use secure cookies in production
    //             sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict', // CSRF protection
    //             max: 1 * 24 * 60 * 60 * 1000, // cookie expire time
    //         })
    
    //         return res.json({success:true, user: {email: user.email, name: user.name}});
    
    //     }catch(error){
    //         console.log(error.message);
    //         res.json({success: false, message: error.message});
    //     }
    // }

    //login user
    async login(req, res){
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.json({success: false, message: "Email and password are requied"})
            }
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'});

                res.cookie('adminToken', token, {
                    httpOnly: true, // prevent js to access
                    secure: false, 
                    sameSite: 'lax', 
                    // secure: process.env.NODE_ENV === 'production', // use secure cookies in production
                    // sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict', // CSRF protection
                    maxAge: 1 * 24 * 60 * 60 * 1000, // cookie expire time
                })


                return res.json({success:true, message: "logged in"});
            }else{
                return res.json({success: false, message: {emailError: 'Invalid credentials'}});
            }
        }catch(error){
            console.log(error.message);
            res.json({success: false, message: error.message});
        }
    }

    async isAuth(req, res){
        try {
            return res.json({success: true})
        } catch (error) {
            console.log(error.message);
            res.json({success: false, message: error.message});
        }
    }

    // logout
    async logout(req, res){
        try {
            res.clearCookie('adminToken', {
                httpOnly: true,
                secure: false, // use secure cookies in production
                sameSite: 'lax', // CSRF protection
            });
            return res.json({success: true, message: "Logged out"});
        } catch (error) {
            console.log(error.message);
            res.json({success: false, message: error.message});
        }
    }

}

export default adminController;