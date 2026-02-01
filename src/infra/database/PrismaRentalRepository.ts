import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { Rental } from "../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma = new PrismaClient();

  async create(data: Rental): Promise<Rental> {
    const rentalP = await this.prisma.rental.create({
      data: {
        carId: data.carId,
        userId: data.userId,
        expectedReturnDate: data.expectedReturnDate,
        startDate: new Date(),
      },
    });

    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    
    rental.id = rentalP.id;
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined; 

    return rental;
  }

  async findOpenByCar(carId: string): Promise<Rental | null> {
    const rentalP = await this.prisma.rental.findFirst({
      where: { carId, endDate: null },
    });

    if (!rentalP) return null;

    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    rental.id = rentalP.id;
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined;

    return rental;
  }

  async findOpenByUser(userId: string): Promise<Rental | null> {
    const rentalP = await this.prisma.rental.findFirst({
      where: { userId, endDate: null },
    });

    if (!rentalP) return null;

    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    rental.id = rentalP.id;
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined;

    return rental;
  }
}
