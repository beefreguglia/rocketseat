
import { TasksController } from "@/controllers/tasks.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.use(ensureAuthenticated)
tasksRoutes.use(verifyUserAuthorization(["ADMIN", "MEMBER"]))

tasksRoutes.get("/:teamId", tasksController.index);
tasksRoutes.post("/:teamId", tasksController.create);
tasksRoutes.get("/:taskId/team/:teamId", tasksController.get);
tasksRoutes.put("/:taskId", tasksController.update);
tasksRoutes.patch("/:taskId/status/in_progress", tasksController.changeToInProgress);
tasksRoutes.patch("/:taskId/status/pending", tasksController.changeToPending);
tasksRoutes.patch("/:taskId/status/completed", tasksController.changeToCompleted);
tasksRoutes.delete("/:taskId", tasksController.delete);

export { tasksRoutes }