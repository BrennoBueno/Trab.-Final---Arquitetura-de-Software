import { Container } from "inversify";
import { TYPES } from "./types";

import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaRentalRepository } from "../../infra/database/PrismaRentalRepository";
// ATENÇÃO: Verifique se 'useCases' está com 'C' maiúsculo na sua pasta
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

const container = new Container();

// quem pedir o IrentalRepository vai receber o Prisma
container.bind<IRentalRepository>(TYPES.IRentalRepository).to(PrismaRentalRepository);

// registra o UseCase, usado pelo Controller
//container.bind(CreateRentalUseCase).toSelf();

export { container };