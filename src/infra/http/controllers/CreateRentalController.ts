import { Request, Response } from "express";
import { container } from "../../../shared/container";

import { CreateRentalUseCase } from "../../../application/useCases/createRental/CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {

    // Recebe os dados do corpo do json
    const { carId, userId, expectedReturnDate } = request.body;


    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    // 3. Executa a ação
    await createRentalUseCase.execute({
      carId,
      userId,
      expectedReturnDate: new Date(expectedReturnDate) // Converte string para Date
    });

    // 4. Devolve resposta de sucesso (201 = Criado)
    return response.status(201).send();
  }
}