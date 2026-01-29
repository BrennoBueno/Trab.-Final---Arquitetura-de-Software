import "reflect-metadata";
import { container } from "../shared/container";
import { CreateRentalUseCase } from "../application/useCases/createRental/CreateRentalUseCase";

async function main() {
  const createRentalUseCase = container.get<CreateRentalUseCase>(CreateRentalUseCase);

  console.log("--- Iniciando Cadastro de Aluguel (CLI) ---");

  try {
    const rental = await createRentalUseCase.execute({
      userId: "1", 
      carId: "ABC",    
      expectedReturnDate: new Date("2026-02-15T10:00:00Z") 
    });

    console.log("✅ Aluguel criado com sucesso!");
    console.log(rental);
    
  } catch (error: any) {
    console.error("❌ Erro na operação:", error.message);
  }
}

main();