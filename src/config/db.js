const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected Successfully")
    }catch(error){
        console.error("MongoDB connection failed:",error.message)
       throw error;
        
    }
};

module.exports=connectDB;
