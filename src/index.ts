import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./route";
import * as swaggerUi from 'swagger-ui-express';

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

  // For API documentation Swagger

  // let options = {
  //   explorer: true
  // };

  try {
    const swaggerDocument = require('../swagger.json');
    app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
      console.log('Unable to load swagger.json', err);
  }

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));