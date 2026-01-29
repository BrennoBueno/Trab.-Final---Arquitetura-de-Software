import { Router } from "express";
import { CreateCarController } from "../controllers/CreateCarController";

const carRoutes = Router();
const createCarController = new CreateCarController();

carRoutes.post("/", createCarController.handle);

export { carRoutes };