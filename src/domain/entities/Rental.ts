export class Rental {
  id?: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
  end_date?: Date;
  total?: number;

  constructor(car_id: string, user_id: string, expected_return_date: Date) {
    this.car_id = car_id;
    this.user_id = user_id;
    this.start_date = new Date;
    this.expected_return_date = expected_return_date  
  }
}