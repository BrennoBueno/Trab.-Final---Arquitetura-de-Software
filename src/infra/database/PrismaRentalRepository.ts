import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { ICreateRentalDTO } from "../../application/useCases/createRental/CreateRentalDTO";
import { Rental } from "../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma = new PrismaClient();

  async create({ carId, userId, expectedReturnDate }: ICreateRentalDTO): Promise<void> {
    await this.prisma.rental.create({
      data: {
        carId,
        userId,
        expectedReturnDate,
        startDate: new Date(),
      },
    });
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | null> {
    return await this.prisma.rental.findFirst({
      where: { carId, endDate: null },
    });
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | null> {
    return await this.prisma.rental.findFirst({
      where: { userId, endDate: null },
    });
  }
}