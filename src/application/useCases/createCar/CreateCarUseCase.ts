import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { Car } from "../../../domain/entities/Car";
import { ICreateCarDTO } from "./CreateCarDTO";

@injectable()
export class CreateCarUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({ name, brand, daily_rate, license_plate }: ICreateCarDTO): Promise<Car> {
    // Verificar se já existe carro com essa placa
    const carExists = await this.prisma.car.findUnique({
      where: { license_plate },
    });

    if (carExists) {
      throw new Error("Já existe um carro com essa placa");
    }

    // Criar carro no banco
    const carP = await this.prisma.car.create({
      data: {
        name,
        brand,
        daily_rate,
        license_plate,
        available: true,
      },
    });

    // Retornar entidade de domínio
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
}