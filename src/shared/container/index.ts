
//Rodando com Prisma

import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types"; 

import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

import { PrismaRentalRepository } from "../../infra/database/PrismaRentalRepository";
import { InMemoryCarRepository } from "../../infra/inMemory/InMemoryCarRepository";

const container = new Container();

container.bind<ICarRepository>(TYPES.CarRepository).to(InMemoryCarRepository).inSingletonScope();
container.bind<IRentalRepository>(TYPES.RentalRepository).to(PrismaRentalRepository).inSingletonScope();

export { container };

