import "reflect-metadata";
import express from "express";
import "../../container";
import { rentalRoutes } from "../../../infra/http/routes/rental.routes";
import { carRoutes } from "../../../infra/http/routes/car.routes";

const app = express();
app.use(express.json());

app.use("/rentals", rentalRoutes);
app.use("/cars", carRoutes);

app.listen(3333, () => console.log("Server is running! #!#"));