
//Rodando com Prisma

import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

import { PrismaRentalRepository } from "../../infra/database/PrismaRentalRepository";
import { PrismaCarRepository } from "../../infra/database/PrismaCarRepository";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { CreateCarUseCase } from "../../application/useCases/createCar/CreateCarUseCase";

const container = new Container();

container
  .bind<ICarRepository>(TYPES.CarRepository)
  .to(PrismaCarRepository)
  .inSingletonScope();

container
  .bind<IRentalRepository>(TYPES.RentalRepository)
  .to(PrismaRentalRepository)
  .inSingletonScope();

container
  .bind<CreateRentalUseCase>(CreateRentalUseCase)
  .toSelf()
  .inSingletonScope();

container
  .bind<CreateCarUseCase>(CreateCarUseCase)
  .toSelf()
  .inSingletonScope();

export { container };

