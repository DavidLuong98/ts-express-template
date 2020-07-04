import * as mongoose from "mongoose";
import Post from "./posts.interface";

const PostSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String,
});
const PostModel = mongoose.model<Post & mongoose.Document>("Post", PostSchema);
export default PostModel;
