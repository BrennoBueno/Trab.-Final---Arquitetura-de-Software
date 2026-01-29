import { Request, Response } from "express";
import { container } from "../../../shared/container";
import { CreateCarUseCase } from "../../../application/useCases/createCar/CreateCarUseCase";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
<<<<<<< HEAD
      const { name, brand, daily_rate, license_plate } = request.body;
=======
      const { name, brand, description, daily_rate, license_plate, fine_amount } = request.body;
>>>>>>> master

      const createCarUseCase = container.get(CreateCarUseCase);

      const car = await createCarUseCase.execute({
        name,
        brand,
<<<<<<< HEAD
        daily_rate,
        license_plate,
=======
        description,
        daily_rate,
        license_plate,
        fine_amount
>>>>>>> master
      });

      return response.status(201).json(car);
    } catch (error: any) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}