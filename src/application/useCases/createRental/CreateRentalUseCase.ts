import { inject, injectable } from "inversify";
import { TYPES } from "../../../infra/container/types";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.CarRepository) private carRepository: ICarRepository,
    @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository
  ) {}

  async execute(
    user_id: string,
    car_id: string,
    expected_return_date: Date
  ): Promise<Rental> {
    const minimumHour = 24;

    const car = await this.carRepository.findById(car_id);
    if (!car) {
      throw new Error("Carro não encontrado");
    }
    if (car.available === false) {
      throw new Error("Carro indisponível");
    }

    const carHasRental = await this.rentalRepository.findOpenByCar(car_id);
    if (carHasRental) {
      throw new Error("Carro já está alugado");
    }

    const dateNow = new Date();
    const compare = expected_return_date.getTime() - dateNow.getTime();
    const hours = compare / (1000 * 60 * 60);

    if (hours < minimumHour) {
      throw new Error("Duração do aluguel deve ser de no mínimo 24 horas");
    }

    const rental = new Rental(car_id, user_id, expected_return_date);
    
    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(car_id, false);
    return rental;
  }
}
