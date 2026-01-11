import { Rental } from "../../domain/entities/Rental";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";

export class InMemoryRentalRepository implements IRentalRepository {
  items: Rental[] = [];

  async create(rental: Rental): Promise<Rental> {
    this.items.push(rental);
    return rental;
  }

  async findOpenByCar(car_id: string): Promise<Rental | null> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].car_id === car_id && this.items[i].end_date == null) {
        return this.items[i];
      }
    }
    return null;
  }

  async findOpenByUser(user_id: string): Promise<Rental | null> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].user_id === user_id && this.items[i].end_date == null) {
        return this.items[i];
      }
    }
    return null;
  }
}
