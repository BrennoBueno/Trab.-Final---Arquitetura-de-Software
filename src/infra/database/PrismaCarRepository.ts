import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { Car } from "../../domain/entities/Car";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma = new PrismaClient(); // conecta com o banco

  async findById(id: string): Promise<Car | null> {
    const carPrisma = await this.prisma.car.findUnique({
      where: { id }, // Procura pelo ID do carro
    });

    if (!carPrisma) return null; // retorna null se n achar o ID

    const car = new Car( // caso ache, retorna um object car, mecessario pois o banco retorna um formato do prisma
      carPrisma.id,
      carPrisma.name,
      carPrisma.brand,
      carPrisma.daily_rate,
      carPrisma.license_plate
    );
    car.available = carPrisma.available;

    return car;
  }

    // atualiza o "available:" no banco, quando o aluguel e criado e quando termina
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.prisma.car.update({
      where: { id },
      data: { available },
    });
  }
}
