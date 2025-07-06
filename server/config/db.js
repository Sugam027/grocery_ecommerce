import mongoose from "mongoose";
import 'dotenv/config';


const connectDb = async() =>{
    try{
        mongoose.connection.on('connected', () =>{
            console.log("Database is connected");
        });
        await mongoose.connect(`${process.env.MONGO_URL}`)
    }
    catch (error){
        console.log(error.message);
    }
}

export default connectDb;