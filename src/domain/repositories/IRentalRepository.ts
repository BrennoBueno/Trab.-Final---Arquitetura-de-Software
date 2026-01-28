import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  create(data: Rental): Promise<Rental>;
  findOpenByCar(carId: string): Promise<Rental | null>;
  findOpenByUser(userId: string): Promise<Rental | null>;
}