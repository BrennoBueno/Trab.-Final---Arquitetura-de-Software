import { PrismaClient } from "@prisma/client";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { Rental } from "../../domain/entities/Rental";

export class PrismaRentalRepository implements IRentalRepository {
  
  private prisma = new PrismaClient();

  async create(rental: Rental): Promise<void> {
    
    if (!rental.id) {
      throw new Error("Erro de Infra: O ID do aluguel não pode ser vazio.");
    }

    await this.prisma.rental.create({
      data: {
        id: rental.id,
        carId: rental.carId,
        userId: rental.userId,
        startDate: rental.startDate,
        expectedReturnDate: rental.expectedReturnDate,
        
        // Lembrando que o EndDate e salvo como null, quando o veiculo sai, quando volta, que ele e preenchido.
        endDate: rental.endDate 
      },
    });

    // Log
    console.log(`Sucesso: Aluguel ${rental.id} salvo no banco de dados.`);
  }
}