import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types"; 

import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

import { InMemoryCarRepository } from "../../infra/inMemory/InMemoryCarRepository";
import { InMemoryRentalRepository } from "../../infra/inMemory/InMemoryRentalRepository";

const container = new Container();container.bind<ICarRepository>(TYPES.CarRepository).to(InMemoryCarRepository).inSingletonScope();
container.bind<IRentalRepository>(TYPES.RentalRepository).to(InMemoryRentalRepository).inSingletonScope();

export { container };