import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) return console.log("MONGOOSE is not found");
  if (isConnected) return console.log("using existing database");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
