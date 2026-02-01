import "reflect-metadata";
import { container } from "../../infra/container";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

async function main() {
  console.log("=== RentX - Sistema de Locação de Veículos ===\n");

  try {
    const createRentalUseCase = container.get(CreateRentalUseCase);

    // imput do cli
    const userId = "user-123";
    const carId = "car-111"; // puxa do banco
    const expectedReturnDate = new Date();
    expectedReturnDate.setDate(expectedReturnDate.getDate() + 3); // Devolução em 3 dias

    console.log(" Criando aluguel...");
    console.log(`   Usuário: ${userId}`);
    console.log(`   Carro: ${carId}`);
    console.log(`   Devolução prevista: ${expectedReturnDate.toLocaleDateString()}\n`);

    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate,
    });

    console.log(" Aluguel criado com sucesso!");
    console.log("\n Detalhes do Aluguel:");
    console.log(`   ID: ${rental.id}`);
    console.log(`   Carro: ${rental.carId}`);
    console.log(`   Usuário: ${rental.userId}`);
    console.log(`   Início: ${rental.startDate.toLocaleString()}`);
    console.log(`   Devolução prevista: ${rental.expectedReturnDate.toLocaleString()}`);
    
  } catch (error: any) {
    console.error(" Erro ao criar aluguel:");
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error(" Erro fatal:", error);
    process.exit(1);
  });
