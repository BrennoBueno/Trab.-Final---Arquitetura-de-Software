import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { Rental } from "../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma = new PrismaClient();

  async create(data: Rental): Promise<Rental> {
    const rentalP = await this.prisma.rental.create({ // salva o aluguel no bancoo
      data: {
        carId: data.carId,
        userId: data.userId,
        expectedReturnDate: data.expectedReturnDate,
        startDate: new Date(), // comeca agora
      },
    });

    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    //cria o objeto rental com os dados q vieram do banco
    rental.id = rentalP.id; // id gerado autoamticamente pelo sqlite
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined; // se vier null vira undefined

    return rental;
  }

  async findOpenByCar(carId: string): Promise<Rental | null> {
    const rentalP = await this.prisma.rental.findFirst({ // ve se tm alugel em aberto para esse carro
      where: { carId, endDate: null }, // procura o carId e verifica se o endDate e null
    });

    if (!rentalP) return null; // se retornar null o carro esta disponivel
    // se achou, transforma em object rental para o usuario verificar
    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    rental.id = rentalP.id;
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined;

    return rental;
  }

  async findOpenByUser(userId: string): Promise<Rental | null> { // busca um rental em aberto para esse usuario
    const rentalP = await this.prisma.rental.findFirst({
      where: { userId, endDate: null }, // mesma logica de la de cima, com o id do usuario que queremos e com o endDate que esta null
    });                                 // se n encontrar nada, o usuario esta livre para alugar

    if (!rentalP) return null;
    // se encontrar algo, retorna o aluguel ativo para o UseCase poder verificar
    const rental = new Rental(rentalP.carId, rentalP.userId, rentalP.expectedReturnDate);
    rental.id = rentalP.id;
    rental.startDate = rentalP.startDate;
    rental.endDate = rentalP.endDate ?? undefined;

    return rental;
  }
}
