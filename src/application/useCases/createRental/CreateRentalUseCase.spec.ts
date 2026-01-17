import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/inMemory/InMemoryCarRepository";
import { Car } from "../../../domain/entities/Car";

describe("Criar Aluguel", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalRepository: InMemoryRentalRepository;
  let carRepository: InMemoryCarRepository;

  beforeEach(() => {
    rentalRepository = new InMemoryRentalRepository();
    carRepository = new InMemoryCarRepository();

    createRentalUseCase = new CreateRentalUseCase(
      carRepository,
      rentalRepository
    );
  });

  it("deve iniciar a criação de um aluguel", async () => {
    const car = new Car("1", "Fusca", "VW", 100, "ABC-1234");
    carRepository.items.push(car);

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 1);

    const rental = await createRentalUseCase.execute(
      "user-123",
      "1",
      returnDate
    );

    // ainda não validei tudo
    expect(rental).toBeDefined();
  });

  it("não deve permitir aluguel com menos de 24 horas (ainda não implementado)", async () => {
    const car = new Car("1", "Fusca", "VW", 100, "ABC-1234");
    carRepository.items.push(car);

    const returnDate = new Date();

    //Falta implementar a regra de validação
    await createRentalUseCase.execute("user-123", "1", returnDate);
  });
});
