import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import { stringify } from "querystring";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }
    const theRole = await user.roles;
    var validation = false;
    for (let r of roles){
      for (let ur of theRole){
        if (ur.name.toLocaleLowerCase() == <string>r.toLocaleLowerCase()){
          var validation = true;
          break;
        }
      }
    }
    //Check if array of authorized roles includes the user's role
    let response = {
      "status":false,
      "message":"You Don't Have Permission!"
    }
    if (validation) next();
    else res.status(401).send(response);
  };
};
