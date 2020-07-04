import * as mongoose from "mongoose";
import Post from "./posts.interface";

const PostSchema = new mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  content: String,
  title: String,
});

const PostModel = mongoose.model<Post & mongoose.Document>("Post", PostSchema);
export default PostModel;
