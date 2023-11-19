import mongoose from "mongoose";

export const connectDatabase = async (URL: any) => {
  let connection = await mongoose
    .connect(URL)
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((e) => {
      console.log(e);
    });

  return connection;
};
