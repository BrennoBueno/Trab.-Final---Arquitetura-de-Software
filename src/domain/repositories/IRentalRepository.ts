import { Rental } from "../entities/Rental";
// Interface que define o contrato de acesso aos dados de Aluguel
export interface IRentalRepository {
  create(data: Rental): Promise<Rental>;
  findOpenByCar(carId: string): Promise<Rental | null>;
  findOpenByUser(userId: string): Promise<Rental | null>;
}
