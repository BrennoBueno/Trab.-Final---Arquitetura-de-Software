import { Car } from "../../domain/entities/Car";
import { ICarRepository } from "../../domain/repositories/ICarRepository";

export class InMemoryCarRepository implements ICarRepository {
  items: Car[] = [];

  async findById(id: string): Promise<Car | null> {
    let car = null;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) { 
        car = this.items[i];
      }
    }

    return car; 
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.items[i].available = available;
      }
    }
   
  }
}
