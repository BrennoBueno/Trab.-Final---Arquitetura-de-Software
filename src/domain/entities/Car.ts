export class Car {
  id: string;
  name: string;
  brand: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;

  constructor() {
    this.available = true; 
  }
}