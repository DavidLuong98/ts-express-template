import * as Mongoose from "mongoose";
// import { UserModel } from "./users/users.model";
import * as dotenv from "dotenv";

let database: Mongoose.Connection;
export const connect = () => {
  dotenv.config();
  const { MONGOURI } = process.env;

  console.log(process.env.MONGOURI);
  const uri = MONGOURI;

  if (database) {
    return;
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
