import { Rental } from "../../domain/entities/Rental";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

export class InMemoryRentalRepository implements IRentalRepository {
  public items: Rental[] = [];

  async create(data: Rental): Promise<Rental> {
  data.id = Math.random().toString(36).substring(7); 
  this.items.push(data);
  return data;
}

  async findOpenByCar(car_id: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.car_id === car_id && !rental.end_date);
    return rental || null;
  }

  async findOpenByUser(user_id: string): Promise<Rental | null> {
    const rental = this.items.find((rental) => rental.user_id === user_id && !rental.end_date);
    return rental || null;
  }
}