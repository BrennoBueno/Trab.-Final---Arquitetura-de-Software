import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  create(data: Rental): Promise<Rental>;
  findOpenByCar(car_id: string): Promise<Rental | null>;
  findOpenByUser(user_id: string): Promise<Rental | null>;
}