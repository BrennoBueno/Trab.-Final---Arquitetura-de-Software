import { inject, injectable } from "inversify";
import { TYPES } from "../../../infra/container/types";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";
import { ICreateRentalDTO } from "./CreateRentalDTO";

// Caso de uso responsável por centralizar as regras de negócio da criação de um aluguel
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.CarRepository) private carRepository: ICarRepository,
    @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;

    //o carro precisa existir
    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new Error("Carro não encontrado");
    }
    
    //o carro deve estar disponível para aluguel
    if (car.available === false) {
      throw new Error("Carro indisponível");
    }

    //o usuário não pode ter outro aluguel em aberto
    const userHasRental = await this.rentalRepository.findOpenByUser(userId);
    if (userHasRental) {
      throw new Error("Usuário já possui um aluguel em aberto");
    }

    // o aluguel deve ter duração mínima de 24 horas
    const dateNow = new Date();
    const compare = expectedReturnDate.getTime() - dateNow.getTime();
    const hours = compare / (1000 * 60 * 60);

    if (hours < minimumHour) {
      throw new Error("Duração do aluguel deve ser de no mínimo 24 horas");
    }

    // Criação do aluguel após todas as regras serem validadas
    const rental = new Rental(carId, userId, expectedReturnDate);
    
    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(carId, false);

    return rental;
  }
}
