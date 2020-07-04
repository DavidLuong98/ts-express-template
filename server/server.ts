import App from "./app";
import PostsController from "./post/posts.controller";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./users/user.controller";
import * as dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;
console.log(PORT);

const app = new App([
  new PostsController(),
  new AuthenticationController(),
  new UserController(),
]);

//wanago.io/2018/12/17/typescript-express-error-handling-validation/
https: app.listen();
