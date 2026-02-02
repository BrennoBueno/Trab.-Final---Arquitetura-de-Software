import { Car } from "../../../domain/entities/Car";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
// Implementação em memória do repositório de Carros, utilizada para testes unitários
export class InMemoryCarRepository implements ICarRepository {
  public items: Car[] = [];

  async findById(id: string): Promise<Car | null> {
    const car = this.items.find((car) => car.id === id);
    return car || null;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.items.findIndex((car) => car.id === id);
    if (carIndex >= 0) {
      this.items[carIndex].available = available;
    }
  }
}
