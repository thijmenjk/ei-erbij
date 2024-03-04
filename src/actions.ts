"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { date, createOrGetUserId, mapToStringNumberRecord } from "./utils";

export async function eggCount() {
  return mapToStringNumberRecord(
    await kv.hgetall<Record<string, string>>(date())
  );
}

export async function increaseEggCount() {
  await kv.hincrby(date(), createOrGetUserId(), 1);
  await kv.incrby("eggsLeft", -1);

  revalidatePath("/");
}

export async function decreaseEggCount() {
  const userId = createOrGetUserId();

  // should use a transaction
  if (await kv.hincrby(date(), userId, -1) < 0) {
    await kv.hdel(date(), userId);
  } else {
    await kv.incrby("eggsLeft", 1);
  }

  revalidatePath("/");
}

export async function setEggsLeft(fd: FormData) {
  const eggsLeft = parseInt(fd.get("count") as string);
  if (isNaN(eggsLeft)) {
    throw new Error("Invalid egg count");
  }
  await kv.set("eggsLeft", eggsLeft);

  revalidatePath("/");
  revalidatePath("/calibreer");
}

export async function getEggsLeft() {
  return await kv.get<number>("eggsLeft") ?? 0;
} 
