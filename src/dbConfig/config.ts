import mongoose from "mongoose";


export const connectToMongoose = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
        console.log("Database connected");
    } catch (error:any) {
        console.log("Error in connectTomongoose: ",error.message);
    }
}