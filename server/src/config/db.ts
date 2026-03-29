import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to DB");
    }catch(error){
        console.error(error, 'MongoDB connection error');
    }
}

export default connectDB;
