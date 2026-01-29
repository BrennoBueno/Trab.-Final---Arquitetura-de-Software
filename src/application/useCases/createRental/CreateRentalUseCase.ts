import { inject, injectable } from "inversify";
import { TYPES } from "../../../shared/container/types";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";
import { ICreateRentalDTO } from "../../useCases/createRental/CreateRentalDTO"

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

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new Error("Carro não encontrado");
    }

    if (car.available === false) {
      throw new Error("Carro indisponível");
    }

    const userHasRental = await this.rentalRepository.findOpenByUser(userId);
    if (userHasRental) {
      throw new Error("Usuário já possui um aluguel em aberto");
    }

    const dateNow = new Date();
    const compare = expectedReturnDate.getTime() - dateNow.getTime();
    const hours = compare / (1000 * 60 * 60);

    if (hours < minimumHour) {
      throw new Error("Duração do aluguel deve ser de no mínimo 24 horas");
    }

    const rental = new Rental(carId, userId, expectedReturnDate);
    
    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(carId, false);

    return rental;
  }
}
