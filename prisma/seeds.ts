/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const testUser = await prisma.user.create({
    data: {
      email: 'wojciechrzoska@gmail.com',
      name: 'wojtekAdmin',
      password: '12345',
      firstName: 'Wojciech',
      lastName: 'Rzoska',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
