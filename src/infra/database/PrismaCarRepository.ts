import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { Car } from "../../domain/entities/Car";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma = new PrismaClient();

  async findById(id: string): Promise<Car | null> {
    const carP = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!carP) return null;

    const car = new Car(
      carP.id,
      carP.name,
      carP.brand,
      carP.daily_rate,
      carP.license_plate
    );
    
    car.available = carP.available;

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.prisma.car.update({
      where: { id },
      data: { available },
    });
  }
}
