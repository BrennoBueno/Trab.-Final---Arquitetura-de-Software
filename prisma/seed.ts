import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Populando banco de dados...\n');

  
  await prisma.rental.deleteMany();
  await prisma.car.deleteMany();

  
  const car1 = await prisma.car.create({
    data: {
      id: 'car-111', 
      name: 'Fusca 1970',
      brand: 'Volkswagen',
      daily_rate: 150,
      license_plate: 'ABC-1234',
      available: true,
    },
  });

  const car2 = await prisma.car.create({
    data: {
      id: 'car-222',
      name: 'Gol G4',
      brand: 'Volkswagen',
      daily_rate: 100,
      license_plate: 'XYZ-5678',
      available: true,
    },
  });

  const car3 = await prisma.car.create({
    data: {
      id: 'car-333',
      name: 'Civic 2020',
      brand: 'Honda',
      daily_rate: 250,
      license_plate: 'DEF-9012',
      available: true,
    },
  });

  console.log(' Carros criados:');
  console.log(`   - ${car1.name} (${car1.id})`);
  console.log(`   - ${car2.name} (${car2.id})`);
  console.log(`   - ${car3.name} (${car3.id})`);
  console.log('\n Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(' Erro ao popular banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
