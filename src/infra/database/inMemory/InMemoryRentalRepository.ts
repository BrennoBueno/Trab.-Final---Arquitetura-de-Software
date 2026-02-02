import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
// Implementação em memória do repositório de Aluguéis, utilizada em testes
export class InMemoryRentalRepository implements IRentalRepository {
  public items: Rental[] = [];

  async create(data: Rental): Promise<Rental> {
    // Simula a geração de um identificador, como faria um banco de dados
    data.id = Math.random().toString(36).substring(7); 
    this.items.push(data);
    return data;
  }

  async findOpenByCar(carId: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.carId === carId && !rental.endDate);
    return rental || null;
  }

  async findOpenByUser(userId: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.userId === userId && !rental.endDate);
    return rental || null;
  }
}
