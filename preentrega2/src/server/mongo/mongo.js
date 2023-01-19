import { connect, set } from "mongoose";
import { config } from "dotenv";

const process = config().parsed;
const {MONGOOSE_URI}  = process;

export const connectDB = async () => {
  try {
    set("strictQuery", false);
    await connect(MONGOOSE_URI, { dbName: "estore" });

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
