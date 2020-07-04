import { Request, Response, NextFunction, Router } from "express";
import * as express from "express";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Controller from "../interfaces/controller.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "./post.dto";
import Post from "./posts.interface";
import PostModel from "./posts.model";

class PostsController {
  public path = "/posts";
  public router = express.Router();
  private post = PostModel;

  private posts: Post[] = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreatePostDto, true),
        this.modifyPost
      )
      .delete(`${this.path}/:id`, this.deletePost)
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreatePostDto),
        this.createPost
      );
  }
  private getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(this.posts);
  };

  private createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  };

  private createPost = async (
    request: RequestWithUser,
    response: express.Response
  ) => {
    const postData: CreatePostDto = request.body;
    const createdPost = new this.post({
      ...postData,
      authorId: request.user._id,
    });
    const savedPost = await createdPost.save();
    response.send(savedPost);
  };
  private getAllPost = (
    request: express.Request,
    response: express.Response
  ) => {
    PostModel.find().then((posts) => {
      response.send(posts);
    });
  };

  private getPostById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    PostModel.findById(id).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  // HTTP Patch
  modifyPost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const postData: Post = request.body;
    this.post.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      response.send(post);
    });
  };

  private deletePost = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(new PostNotFoundException(id));
      }
    });
  };
}

export default PostsController;
