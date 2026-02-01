import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { Car } from "../../domain/entities/Car";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma = new PrismaClient();

  async findById(id: string): Promise<Car | null> {
    const carPrisma = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!carPrisma) return null;

    const car = new Car(
      carPrisma.id,
      carPrisma.name,
      carPrisma.brand,
      carPrisma.daily_rate,
      carPrisma.license_plate
    );
    car.available = carPrisma.available;

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.prisma.car.update({
      where: { id },
      data: { available },
    });
  }
}
