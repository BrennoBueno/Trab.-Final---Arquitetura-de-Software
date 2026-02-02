import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository";
import { Car } from "../../../domain/entities/Car";

describe("Criar Aluguel", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalRepository: InMemoryRentalRepository;
  let inMemoryCarRepository: InMemoryCarRepository;

  // Prepara um ambiente isolado antes de cada teste,
  // garantindo que os casos de teste não dependam uns dos outros
  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository();
    inMemoryCarRepository = new InMemoryCarRepository();

    // Injeção manual das dependências para simular o comportamento real do sistema
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryCarRepository, 
      inMemoryRentalRepository
    );
  });

  it("deve ser capaz de criar um novo aluguel", async () => {
    // Criamos um carro e colocamos ele no repositório de memória
    const car = new Car("car-id-123", "Fusca", "VW", 100, "ABC-1234");
    inMemoryCarRepository.items.push(car);
   
    //Devolução respeita as 24 hrs
    const expectedReturnDate = new Date();
    expectedReturnDate.setDate(expectedReturnDate.getDate() + 2); 

    const rental = await createRentalUseCase.execute({
      userId: "user-id-456",
      carId: car.id,
      expectedReturnDate: expectedReturnDate
    });
    
    // Verifica se o aluguel foi criado e se o estado do carro foi atualizado corretamente
    expect(rental).toHaveProperty("id");
    expect(car.available).toBe(false);
  });

  it("não deve ser capaz de criar um aluguel se o carro não existir", async () => {
    await expect(
      createRentalUseCase.execute({
        userId: "any-user",
        carId: "non-existent-car",
        expectedReturnDate: new Date()
      })
    ).rejects.toThrow("Carro não encontrado");
  });

  it("não deve ser capaz de criar um novo aluguel se o carro estiver indisponível", async () => {
  const car = new Car("car-id-999", "Civic", "Honda", 150, "DEF-5678");
  car.available = false; 
  inMemoryCarRepository.items.push(car);

  const expectedReturnDate = new Date();
  expectedReturnDate.setDate(expectedReturnDate.getDate() + 2);

  await expect(
    createRentalUseCase.execute({
      userId: "user-123",
      carId: car.id,
      expectedReturnDate
    })
  ).rejects.toThrow("Carro indisponível");
});

  it("não deve ser capaz de criar um aluguel com duração menor que 24 horas", async () => {
    const car = new Car("car-id", "Fusca", "VW", 100, "ABC-1234");
    inMemoryCarRepository.items.push(car);

    const expectedReturnDate = new Date(); 
    await expect(
      createRentalUseCase.execute({
        userId: "user-id",
        carId: car.id,
        expectedReturnDate: expectedReturnDate
      })
    ).rejects.toThrow("Duração do aluguel deve ser de no mínimo 24 horas");
  });
});
