// Entidade que representa um aluguel no domínio da aplicação
export class Rental {
  id?: string;
  carId: string;
  userId: string;
  startDate: Date;
  expectedReturnDate: Date;
  endDate?: Date;
  total?: number;

  constructor(carId: string, userId: string, expectedReturnDate: Date) {
    this.carId = carId;
    this.userId = userId;
    this.startDate = new Date(); // Regra de domínio: o início do aluguel é definido no momento da criação
    this.expectedReturnDate = expectedReturnDate;
  }
}
