import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

import { PrismaCarRepository } from "../database/PrismaCarRepository";
import { PrismaRentalRepository } from "../database/PrismaRentalRepository";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

const container = new Container();

// Binds para PRODUÇÃO (usando Prisma)
container.bind<ICarRepository>(TYPES.CarRepository).to(PrismaCarRepository).inSingletonScope();
container.bind<IRentalRepository>(TYPES.RentalRepository).to(PrismaRentalRepository).inSingletonScope();

container
  .bind<CreateRentalUseCase>(CreateRentalUseCase)
  .toSelf()
  .inSingletonScope();

export { container };
