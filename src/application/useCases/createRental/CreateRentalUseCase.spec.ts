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
    createRentalUseCase = new CreateRentalUseCase(inMemoryCarRepository, inMemoryRentalRepository);
  });

  it("deve criar um novo aluguel com sucesso", async () => {
    const car = new Car("1", "Fusca", "VW", 100, "ABC-1234");
    inMemoryCarRepository.items.push(car);

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 2); // 48 horas depois

    const rental = await createRentalUseCase.execute("user-123", "1", returnDate);

    expect(rental).toHaveProperty("car_id");
    expect(car.available).toBe(false); // O carro tem que ficar indisponível
  });

  it("não deve alugar por menos de 24 horas", async () => {
    const car = new Car("1", "Fusca", "VW", 100, "ABC-1234");
    inMemoryCarRepository.items.push(car);

    const returnDate = new Date(); // Mesma data de agora

    await expect(
      createRentalUseCase.execute("user-123", "1", returnDate)
    ).rejects.toThrow("Duração do aluguel deve ser de no mínimo 24 horas");
  });
});
