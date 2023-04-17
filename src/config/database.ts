import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
<<<<<<< HEAD
  if (prisma) {
    return;
  }

=======
>>>>>>> 9251cb64303fd046acdbd32d934a193a3dd5356d
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
