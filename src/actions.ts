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

  revalidatePath("/");
}

export async function decreaseEggCount() {
  const userId = createOrGetUserId();

  // should use a transaction
  if (await kv.hincrby(date(), userId, -1) <= 0) {
    await kv.hdel(date(), userId);
  }

  revalidatePath("/");
}
