import { Request, Response } from "express";
import { container } from "../../../shared/container"; // 3 níveis para subir
import { CreateRentalUseCase } from "../../../application/useCases/createRental/CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId, userId, expectedReturnDate } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    await createRentalUseCase.execute({
      carId,
      userId,
      expectedReturnDate,
    });

    return response.status(201).send();
  }
}