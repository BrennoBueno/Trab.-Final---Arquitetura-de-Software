import { Car } from "../entities/Car";
// Interface que define o contrato de acesso aos dados de Carro
export interface ICarRepository {
  findById(id: string): Promise<Car | null>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
