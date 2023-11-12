import mongoose from "mongoose";

const dbConnect=async()=>{
    try {
        const connectDB=await mongoose.connect(process.env.DB_URL)
        console.log(`Connected to mongo db Successfully ${connectDB.connection.host}`);
    } catch (error) {
        console.log("Error in getting DataBase Connection")
    }
}

export default dbConnect;