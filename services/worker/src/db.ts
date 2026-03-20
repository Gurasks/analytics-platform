import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/analytics");

  console.log("🗄️ [worker] connected to MongoDB");
}
