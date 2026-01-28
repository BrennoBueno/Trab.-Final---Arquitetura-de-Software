import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

import { PrismaRentalRepository } from "../../infra/database/PrismaRentalRepository";
import { InMemoryCarRepository } from "../../infra/inMemory/InMemoryCarRepository";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

const container = new Container();

// Repositórios
container
  .bind<ICarRepository>(TYPES.CarRepository)
  .to(InMemoryCarRepository)
  .inSingletonScope();

container
  .bind<IRentalRepository>(TYPES.RentalRepository)
  .to(PrismaRentalRepository)
  .inSingletonScope();


container
  .bind<CreateRentalUseCase>(CreateRentalUseCase)
  .toSelf()
  .inSingletonScope();

export { container };