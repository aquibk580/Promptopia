import mongoose from "mongoose";

let isConnected = false;

export const connectToMongo = async () => {
  mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,  
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    setTimeout(connectToMongo, 5000); 
  }
};
