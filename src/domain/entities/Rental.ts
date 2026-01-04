export class Rental {
  id?: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
  end_date?: Date;
  total?: number;

  constructor() {
    this.start_date = new Date();
  }
}