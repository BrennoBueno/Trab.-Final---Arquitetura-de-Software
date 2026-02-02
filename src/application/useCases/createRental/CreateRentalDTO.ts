// DTO responsável por definir os dados necessários para a criação de um aluguel
export interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}
