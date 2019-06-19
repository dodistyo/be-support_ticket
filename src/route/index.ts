import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import ticket from "./ticket";

const routes = Router();
// Api versioning route
const version = "1.0";
const api = "/api/v"+version;

routes.use(api+"/auth", auth);
routes.use(api+"/user", user);
routes.use(api+"/ticket", ticket);

export default routes;
