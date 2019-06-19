
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { Ticket } from "../entity/Ticket";

class TicketController{

static listAll = async (req: Request, res: Response) => {
  //Get tickets from database
  const ticketRepository = getRepository(Ticket);
  const tickets = await ticketRepository.find({ 
    select: {
      id: true,
      subject: true,
      ticketNumber: true,
      email: true,
      phone: true,
      createdAt: true,
      issueDescription: true,
      actionDoneDescription: true,
      category: {
          id: true,
          name: true
      },
      priority: {
          id: true,
          name: true
      },
      state: {
          id: true,
          name: true
      },
      requesterUser: {
          id: true,
          name: true
      },
      assignedUser: {
          id: true,
          name: true
      },
      staffClosed: true,
      userClosed: true
    },
    relations: ["category","priority","state","assignedUser","requesterUser"],      
    });

  //Send the tickets object
  res.send(tickets);
};

static filterByRequesterUser = async (req: Request, res: Response) => {
  //Get tickets from database
  const token_value = (<string>req.headers.authorization).split(" ");
  const token = token_value[1];
  const userDetail:any = await jwt.decode(token);
  const ticketRepository = getRepository(Ticket);
  const tickets = await ticketRepository.find({ 
      select: {
        id: true,
        subject: true,
        ticketNumber: true,
        email: true,
        phone: true,
        createdAt: true,
        issueDescription: true,
        actionDoneDescription: true,
        category: {
            id: true,
            name: true
        },
        priority: {
            id: true,
            name: true
        },
        state: {
            id: true,
            name: true
        },
        requesterUser: {
            id: true,
            name: true
        },
        assignedUser: {
            id: true,
            name: true
        },
        staffClosed: true,
        userClosed: true
      },
      relations: ["category","priority","state","assignedUser","requesterUser"],
      where : { requesterUser : { id : userDetail.userId }}
    });
  //Send the tickets object
  res.send(tickets);
};

static filterByAssignedUser = async (req: Request, res: Response) => {
  //Get tickets from database
  const token_value = (<string>req.headers.authorization).split(" ");
  const token = token_value[1];
  const userDetail:any = await jwt.decode(token);
  const ticketRepository = getRepository(Ticket);
  const tickets = await ticketRepository.find({ 
      select: {
        id: true,
        subject: true,
        ticketNumber: true,
        email: true,
        phone: true,
        createdAt: true,
        issueDescription: true,
        actionDoneDescription: true,
        category: {
            id: true,
            name: true
        },
        priority: {
            id: true,
            name: true
        },
        state: {
            id: true,
            name: true
        },
        requesterUser: {
            id: true,
            name: true
        },
        assignedUser: {
            id: true,
            name: true
        },
        staffClosed: true,
        userClosed: true
      },
      relations: ["category","priority","state","assignedUser","requesterUser"],
      where : { assignedUser : { id : userDetail.userId }}
    });
  //Send the tickets object
  res.send(tickets);
};

static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = req.params.id;

  //Get the ticket from database
  const ticketRepository = getRepository(Ticket);
  try {
    const ticket = await ticketRepository.findOneOrFail(id, {
      relations: ["category","priority","state"]        
    });
    res.send(ticket);
  } catch (error) {
    res.status(404).send("Ticket not found");
  }
};

static newTicket = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { subject, ticketNumber, email, phone, issueDescription, actionDoneDescription, requesterUser, assignedUser, category, priority, staffClosed, userClosed, state } = req.body;
  let ticket = new Ticket();
  let tanggal = new Date().valueOf();
 //Field to update
  if(subject) ticket.subject = subject;
  ticket.ticketNumber = 'ST'+tanggal;
  if(email) ticket.email = email;
  if(phone) ticket.phone = phone;
  if(issueDescription) ticket.issueDescription = issueDescription;
  if(requesterUser) ticket.requesterUser = <any>{ id : requesterUser };
  if(category) ticket.category = <any>{ id : category };
  if(userClosed) ticket.userClosed = userClosed;
  if(actionDoneDescription) ticket.actionDoneDescription = actionDoneDescription;
  if(assignedUser) ticket.assignedUser = <any>{ id : assignedUser };
  if(priority) ticket.priority = <any>{ id : priority };
  if(staffClosed) ticket.staffClosed = staffClosed;
  if(state) ticket.state = <any>{ id : state };

  //Validade if the parameters are ok
  const errors = await validate(ticket);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }


  //Try to save. If fails, the ticketname is already in use
  const ticketRepository = getRepository(Ticket);
  try {
    await ticketRepository.save(ticket);
  } catch (e) {
    res.status(409).send(e);
    return;
  }

  //If all ok, send 201 response
  let response = {
    "status":true,
    "message":"Record Created!"
  }
  res.status(201).send(response);
};

static editTicket = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;
  const token_value = (<string>req.headers.authorization).split(" ");
  const token = token_value[1];
  const userDetail:any = await jwt.decode(token);
  const checkRoleExistence = roleParam => userDetail.roles.some( ({name}) => name == roleParam)
  let checkAdmin = checkRoleExistence("Admin");
  let checkManager = checkRoleExistence("Manager");
  let checkStaff = checkRoleExistence("Staff");
  let checkUser = checkRoleExistence("User");
  
  //Get values from the body
  let { subject, ticketNumber, email, phone, issueDescription, actionDoneDescription, requesterUser, assignedUser, category, priority, staffClosed, userClosed, state } = req.body;

  //Try to find ticket on database
  const ticketRepository = getRepository(Ticket);
  let ticket;
  try {
    ticket = await ticketRepository.findOneOrFail(id,{relations : ["assignedUser"]});
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send(error);
    return;
  }

  if (checkAdmin || checkManager){
    //Field to update
    if(subject) ticket.subject = subject;
    if(ticketNumber) ticket.ticketNumber = ticketNumber;
    if(email) ticket.email = email;
    if(phone) ticket.phone = phone;
    if(issueDescription) ticket.issueDescription = issueDescription;
    if(requesterUser) ticket.requesterUser = <any>{ id : requesterUser };
    if(category) ticket.category = <any>{ id : category };
    // if(userClosed) ticket.userClosed = userClosed;
    //Only certain roles can update these field below
    if(actionDoneDescription) ticket.actionDoneDescription = actionDoneDescription;
    if(assignedUser) ticket.assignedUser = <any>{ id : assignedUser };
    if(priority) ticket.priority = <any>{ id : priority };
    // if(staffClosed) ticket.staffClosed = staffClosed;
    if(state) ticket.state = <any>{ id : state };
  }else if(checkStaff){
    // Staff can only update ticket that assigned to them
    if (ticket.assignedUser.id != userDetail.userId){
      let response = {
        "status":false,
        "message":"Unauthorized!"
      }
      res.status(401).send(response);
      return;
    }
    //Field to update
    let theState;
    if(subject) ticket.subject = subject;
    if(email) ticket.email = email;
    if(phone) ticket.phone = phone;
    if(ticket.userClosed && staffClosed){
      theState = 4 // set state closed
    }else if(!ticket.userClosed && !staffClosed){
      theState = 1 // set state open
    }else if(!staffClosed && ticket.userClosed){
      theState = 3
    }else if(staffClosed && !ticket.userClosed){
      theState = 2
    }
    ticket.staffClosed = staffClosed;
    if(category) ticket.category = <any>{ id : category };
    if(actionDoneDescription) ticket.actionDoneDescription = actionDoneDescription;
    ticket.state = <any>{ id : theState };
  }else if(checkUser){
    //Field to update
    let theState;
    if(ticket.staffClosed && userClosed){
      theState = 4 // set state closed
    }else if(!ticket.staffClosed && !userClosed){
      theState = 1 // set state open
    }else if(!userClosed && ticket.staffClosed){
      theState = 2 
    }else if(userClosed && !ticket.staffClosed){
      theState = 3
    }
    if(subject) ticket.subject = subject;
    if(email) ticket.email = email;
    if(phone) ticket.phone = phone;
    if(issueDescription) ticket.issueDescription = issueDescription;
    if(category) ticket.category = <any>{ id : category };
    ticket.userClosed = userClosed;
    ticket.state = <any>{ id : theState };    
  }else{
    let response = {
      "status":false,
      "message":"Unrecognize Role!"
    }
    res.status(401).send(response);
    return;
  }
  
  const errors = await validate(ticket);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means ticketname already in use
  try {
    await ticketRepository.save(ticket);
  } catch (e) {
    res.status(409).send(e);
    return;
  }
  //After all send a 204 (no content, but accepted) response
  let response = {
    "status":true,
    "message":"Record Updated!"
  }
  res.status(200).send(response);
};

static deleteTicket = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const ticketRepository = getRepository(Ticket);
  let ticket: Ticket;
  try {
    ticket = await ticketRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Ticket not found");
    return;
  }
  ticketRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  let response = {
    "status":true,
    "message":"Record Deleted!"
  }
  res.status(200).send(response);
};
};

export default TicketController;