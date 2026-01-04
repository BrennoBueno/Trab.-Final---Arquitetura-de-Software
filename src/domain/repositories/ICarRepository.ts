export interface ICarRepository {
  findById(id: string): Promise<any>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}