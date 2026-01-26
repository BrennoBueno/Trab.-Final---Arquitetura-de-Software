import "reflect-metadata";
import express from "express";
import "../../container"; // Isso carrega do container
import { rentalRoutes } from "../../../infra/http/routes/rental.routes";

const app = express();
app.use(express.json());

app.use("/rentals", rentalRoutes);

app.listen(3333, () => console.log("Server is running! 🚀"));