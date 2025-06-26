
import { TeamsController } from "@/controllers/teams.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensureAuthenticated)
teamsRoutes.use(verifyUserAuthorization(["ADMIN"]))

teamsRoutes.post("/", teamsController.create)

export { teamsRoutes }