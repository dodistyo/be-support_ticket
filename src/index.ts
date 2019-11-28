import { createConnection,getRepository } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./route";
import * as swaggerUi from "swagger-ui-express";
import * as graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import { importSchema } from "graphql-import";
import * as path from "path";
import root from "./route/graphql-root";
import "reflect-metadata";
import { Notification } from "./entity/Notification";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();
    const http = require('http');
    const server = http.createServer(app);

    const io = require('socket.io').listen(server);

    // Call midlewares
    app.use(cors({
      origin: 'http://localhost:8080'
    }));
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

    // <== GraphQL ==>
    // const schema = buildSchema(`
    //   type Query {
    //     hello: String
    //   }
    // `);
    // The root provides a resolver function for each API endpoint
    // const root = {
    //   hello: () => {
    //     return 'Hello world!';
    //   }
    // };
    const schema = buildSchema(
      importSchema(path.join(__dirname, "./schema.graphql"))
      )
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));

    //<== socket.io ==>
    io.on('connection',async function(socket){  
      let channel = []
      channel.push('notif for manager');
      for (let cn of channel) {
        console.log(cn)
        socket.on(cn,function(notification){
          io.emit(cn,notification);
        });
      }
     
    });

    //Set all routes from routes folder
    app.use("/", routes);

    // app.listen(3000, () => {
    //   console.log("Server started on port 3000!");
    // });
    server.listen('3000', () => {
      console.log('Server listening on Port 3000');
    })
  })
  .catch(error => console.log(error));