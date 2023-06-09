import { prisma } from "./client";

export function clearPrismaDb() {
  const keysToIgnore = new Set([
    "setData",
    "getData",
  ]);

  const keys = Object.keys(prisma).filter(key => !keysToIgnore.has(key))

  const newData = keys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as { [key: string]: any[] });

  (prisma as any).setData(newData);
}