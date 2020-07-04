import * as mongoose from "mongoose";
import User from "./user.interface";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    get: (): undefined => undefined,
  },
});
// UserSchema.virtual("posts", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "author",
// });
const UserModel = mongoose.model<User & mongoose.Document>("User", UserSchema);
export default UserModel;
