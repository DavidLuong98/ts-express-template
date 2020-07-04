import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cookieParser from "cookie-parser";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;

  public port: number;

  constructor(controllers: Controller[]) {
    this.app = express();
    // this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToMongo();
    this.initializeErrorHandling();
  }

  public listen() {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private connectToMongo() {
    const { MONGOURI } = process.env;
    console.log(MONGOURI);
    mongoose
      .connect(`${MONGOURI}`)
      .then(() => console.log("Connected to MongoDb successfully"))
      .catch((err) => {
        console.log(err);
      });
  }
}

export default App;
