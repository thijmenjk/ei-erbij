"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { date, createOrGetUserId, mapToStringNumberRecord } from "./utils";
import { redirect } from "next/navigation";

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
  const result = await kv.hincrby(date(), userId, -1);
  if (result >= 0) {
    await kv.incrby("eggsLeft", 1);
  }
  if (result <= 0) {
    await kv.hdel(date(), userId);
  }

  revalidatePath("/");
}

export async function setEggsLeft(fd: FormData) {
  const eggsLeft = parseInt(fd.get("count") as string);
  if (isNaN(eggsLeft) || eggsLeft < 0 || eggsLeft > 100) {
    throw new Error("Invalid egg count");
  }
  await kv.set("eggsLeft", eggsLeft);

  revalidatePath("/");
  revalidatePath("/kalibreer");

  redirect("/");
}

export async function getEggsLeft() {
  const result = await kv.get<number>("eggsLeft") ?? 0;
  return result < 0 ? 0 : result;
} 
