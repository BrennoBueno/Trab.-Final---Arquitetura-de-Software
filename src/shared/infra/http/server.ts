import "reflect-metadata"; 
import express from "express";
import { container } from "../../container";


const app = express();
app.use(express.json());


app.get("/", (request, response) => {
  return response.json({ message: "online pai" });
});

app.listen(3333, () => {
  console.log("online pai");
});