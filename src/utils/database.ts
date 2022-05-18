import mongoose from "mongoose";
import logger from "./logger";

const dbUri =
  "mongodb+srv://guneyural0:guneyural0@cluster0.9ma6e.mongodb.net/Cluster0?retryWrites=true&w=majority";

export async function connectDb() {
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to database");
  } catch (e: any) {
    logger.info("Could not connect to database");
    logger.error(e);
    process.exit(0);
  }
}

export async function disconnectDb() {
  await mongoose.connection.close();
  logger.info("Disconnected from database");
  
  return;
}
