import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/inMemory/InMemoryCarRepository";
import { Car } from "../../../domain/entities/Car";

describe("Criar Aluguel", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalRepository: InMemoryRentalRepository;
  let inMemoryCarRepository: InMemoryCarRepository;

  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository();
    inMemoryCarRepository = new InMemoryCarRepository();
    
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryCarRepository, 
      inMemoryRentalRepository
    );
  });

  it("deve ser capaz de criar um novo aluguel", async () => {
    const car = new Car("car-id-123", "Fusca", "VW", 100, "ABC-1234");
    inMemoryCarRepository.items.push(car);

    const expectedReturnDate = new Date();
    expectedReturnDate.setDate(expectedReturnDate.getDate() + 2); 

    const rental = await createRentalUseCase.execute({
      userId: "user-id-456",
      carId: car.id,
      expectedReturnDate: expectedReturnDate
    });

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