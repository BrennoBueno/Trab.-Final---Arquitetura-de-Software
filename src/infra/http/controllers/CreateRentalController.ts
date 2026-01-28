import { Request, Response } from "express";
import { container } from "../../../shared/container";
import { CreateRentalUseCase } from "../../../application/useCases/createRental/CreateRentalUseCase";
import { TYPES } from "../../../shared/container/types";

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { carId, userId, expectedReturnDate } = request.body;

      // ✅ CORRETO: usar .get() ao invés de .resolve()
      const createRentalUseCase = container.get<CreateRentalUseCase>(
        CreateRentalUseCase
      );

      const rental = await createRentalUseCase.execute({
        carId,
        userId,
        expectedReturnDate: new Date(expectedReturnDate),
      });

      return response.status(201).json(rental);
    } catch (error: any) {
      return response.status(400).json({
        error: error.message || "Erro ao criar aluguel",
      });
    }
  }
}