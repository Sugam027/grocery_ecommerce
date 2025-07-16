import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class userController{
    // resgister user
    async register(req, res){
        try{
            const {name, email, password} = req.body;
    
            if(!name || !email || !password){
                return res.json({success: false, message: "Some Details is missing"})
            }
            const existingUser = await User.findOne({email: email});
    
            if(existingUser){
                return res.json({success: false, message: "User already exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({name, email, password: hashedPassword});
    
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    
            res.cookie('token', token, {
                httpOnly: true, // prevent js to access
                secure: false, // use secure cookies in production
                sameSite: 'lax', // CSRF protection
                maxAge: 1 * 24 * 60 * 60 * 1000, // cookie expire time
            })
    
            return res.json({success:true, user: {email: user.email, name: user.name}});
    
        }catch(error){
            console.log(error.message);
            res.json({success: false, message: error.message});
        }
    }

    //login user
    async login(req, res){
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.json({success: false, message: "Email and password are requied"})
            }
            let findData = await User.findOne({email: email});
            if(!findData){
                return res.json({success: false, message: {emailError: 'Invalid email'}});
            }else{
                let isMatch = await bcrypt.compare(password, findData.password);
                if(!isMatch){
                    return res.json({success: false, message: {passwordError: 'Invalid password'}});
                }else{
                    const token = jwt.sign({id: findData._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    
                res.cookie('token', token, {
                    httpOnly: true, // prevent js to access
                    secure: false, // use secure cookies in production
                    sameSite: 'lax', // CSRF protection
                    maxAge: 1 * 24 * 60 * 60 * 1000, // cookie expire time
                })
        
                return res.json({success:true, user: {email: findData.email, name: findData.name, id: findData._id}});
                }
            }
        }catch(error){
            console.log(error.message);
            res.json({success: false, message: error.message});
        }
    }

    async isAuth(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log('Auth check error:', error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    }

    // logout
    async logout(req, res){
        try {
            res.clearCookie('token', {
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

export default userController;