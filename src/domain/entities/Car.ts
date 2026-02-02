// Entidade que representa um carro no domínio da aplicação
export class Car {
  id: string;
  name: string;
  brand: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;

  constructor(id: string, name: string, brand: string, daily_rate: number, license_plate: string) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.daily_rate = daily_rate;
    this.license_plate = license_plate;
    this.available = true; // REGRA DE NEGÓCIO: Todo carro novo cadastrado já começa como disponível por padrão.
  }
}
