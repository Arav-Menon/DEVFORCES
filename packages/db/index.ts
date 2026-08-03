import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error'],
});

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;
  try {
    await db.$connect();
    isConnected = true;
  } catch (err) {
    console.error('[DB] Connection failed, retrying in 2s...');
    await new Promise((r) => setTimeout(r, 2000));
    await db.$connect();
    isConnected = true;
  }
}