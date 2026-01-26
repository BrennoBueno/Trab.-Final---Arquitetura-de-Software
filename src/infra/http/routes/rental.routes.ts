import { Router } from "express";
import { CreateRentalController } from "../controllers/CreateRentalController";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

// metodo POST no endereço "/" chama o controller
rentalRoutes.post("/", createRentalController.handle);

export { rentalRoutes };