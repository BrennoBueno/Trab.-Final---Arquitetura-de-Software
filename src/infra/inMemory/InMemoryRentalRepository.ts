import { Rental } from "../../domain/entities/Rental";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

export class InMemoryRentalRepository implements IRentalRepository {
  public items: Rental[] = [];

  async create(data: Rental): Promise<Rental> {
  data.id = Math.random().toString(36).substring(7); 
  this.items.push(data);
  return data;
}

  async findOpenByCar(carId: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.carId === carId && !rental.endDate);
    return rental || null;
  }

  async findOpenByUser(userId: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.carId === userId && !rental.endDate);
    return rental || null;
  }
}