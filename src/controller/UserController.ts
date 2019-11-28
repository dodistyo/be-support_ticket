
import { Request, Response } from "express";
import { getRepository,getConnection } from "typeorm";
import { validate } from "class-validator";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";

class UserController{

static listAll = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = getRepository(User);
  const users = await userRepository.find({ select: ["id", "username", "email", "name", "phone"],relations: ["roles"] });

  //Send the users object
  res.send(users);
};

static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = parseInt(req.params.id);

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username"], //We dont want to send the password on response
      relations: ["roles"]
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

static newUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { username, password, name, email, phone, role } = req.body;
  let user = new User();
  if(name) user.name = name;
  if(email) user.email = email;
  if(phone) user.phone = phone;
  if(username) user.username = username;
  if(password) user.password = password;
  let theRoles = [];
  for (let rl of role){
    let obj = {};
    obj['id'] = rl;
    theRoles.push(obj);
  }
  if (role != []){
    user.roles = theRoles;
  }

  //Set Repository
  const userRepository = getRepository(User);


  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  let response = {
    "status":true,
    "message":"Record Created!"
  }
  res.status(201).send(response);
};

static editUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;
  
  //Get values from the body
  let { username, password, name, email, phone, role } = req.body;

  //Try to find user on database
  // let userRoleRel = new UserRoleRelation();
  const userRepository = getRepository(User);
  // const userRoleRepository = getRepository(UserRoleRelation);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  if(name) user.name = name;
  if(email) user.email = email;
  if(phone) user.phone = phone;
  if(username) user.username = username;
  if(password) user.password = bcrypt.hashSync(password, 8);
  let theRoles = [];
  for (let rl of role){
    let obj = {};
    obj['id'] = rl;
    theRoles.push(obj);
  }
  if (role != []){
    user.roles = theRoles;
  }
  const errors = await validate(user);
  if (errors.length > 0) {
    var message;
    for(let err of errors){
      delete err.target
      message = err
    }
    res.status(400).send(message);
    return;
  }

  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    console.log("TCL: UserController -> staticeditUser -> e", e)
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  let response = {
    "status":true,
    "message":"Record Updated!"
  }
  res.status(200).send(response);
};

static deleteUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(User);
  // const userRoleRepository = getRepository(UserRoleRelation);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  await userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  let response = {
    "status":true,
    "message":"Record Deleted!"
  }
  res.status(200).send(response);
};
};

export default UserController;
