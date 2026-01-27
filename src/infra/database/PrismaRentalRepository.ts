import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { ICreateRentalDTO } from "../../application/useCases/createRental/CreateRentalDTO";
import { Rental } from "../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma = new PrismaClient();

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    return await this.prisma.rental.create({
      data: {
        carId: car_id,
        userId: user_id,
        expectedReturnDate: expected_return_date, 
        startDate: new Date(),
      },
    });
  }

  async findOpenByCar(carId: string): Promise<Rental | null> {
    return await this.prisma.rental.findFirst({
      where: { carId, endDate: null },
    });
  }

  async findOpenByUser(userId: string): Promise<Rental | null> {
    return await this.prisma.rental.findFirst({
      where: { userId, endDate: null },
    });
  }
}