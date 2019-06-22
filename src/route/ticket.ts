import { Router } from "express";
import TicketController from "../controller/TicketController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get detail count for dashboard
  router.get("/detailDashboard", [checkJwt, checkRole(["ADMIN","MANAGER","STAFF","USER"])], TicketController.getDetailDashboard);

  //Get all tickets
  router.get("/", [checkJwt, checkRole(["ADMIN","MANAGER"])], TicketController.listAll);

  //Get all tickets by requester user
  router.get("/byRequesterUser", [checkJwt, checkRole(["USER"])], TicketController.filterByRequesterUser);

  //Get all tickets by assigned user
  router.get("/byAssignedUser", [checkJwt, checkRole(["STAFF"])], TicketController.filterByAssignedUser);

  // Get one ticket
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN","MANAGER"])],
    TicketController.getOneById
  );

  //Create a new ticket
  router.post("/", [checkJwt, checkRole(["ADMIN","MANAGER","STAFF","USER"])], TicketController.newTicket);

  //Edit one ticket
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN","MANAGER","STAFF","USER"])],
    TicketController.editTicket
  );

  //Delete one ticket
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN","MANAGER"])],
    TicketController.deleteTicket
  );

  export default router;