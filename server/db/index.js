import mongoose from "mongoose";

const connectToDatabase = () => {
  const uri = process.env.MongoUri;

  if (!uri) {

    console.error("MongoDB URI is not set in environment variables.");
    return;

  } 

  mongoose
    .connect(uri)
    .then(() => console.log(" CONNECTED TO Assessment DATABASE! "))
    .catch((error) => console.error(`Error connecting: ${error.message}`));
};

export default connectToDatabase;
