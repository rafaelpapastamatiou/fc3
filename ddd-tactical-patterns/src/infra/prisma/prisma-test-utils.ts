import { prisma } from "./client";
import { PrismockClient } from "prismock";

type PrismockClientType = typeof PrismockClient;

export function clearPrismaDb() {
  const keysToIgnore = new Set([
    "setData",
    "getData",
  ]);

  const keys: string[] = [];

  for (const key in prisma) {
    if (keysToIgnore.has(key)) continue;

    keys.push(key);
  }

  const emptyData: { [key: string]: any[] } = {};

  for (const key of keys) {
    emptyData[key] = [];
  }

  (prisma as unknown as PrismockClientType).setData(emptyData);
}