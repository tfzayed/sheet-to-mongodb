import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/excel-data";
let connection: any;

const connectDB = async () => {
  if (!connection) {
    connection = await mongoose.connect(url);
  }
  return connection;
};

export default connectDB;
