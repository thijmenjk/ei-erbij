import { cookies } from "next/headers";

export function mapToStringNumberRecord(record?: Record<string, string> | null) {
  if (!record) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, Number(value)])
  );
}

export function getUserId() {
  return cookies().get("userId")?.value;
}

export function createOrGetUserId() {
  if (!cookies().has("userId")) {
    cookies().set("userId", Math.random().toString(36).substring(7));
  }

  return getUserId()!;
}

export function date() {
  return new Date().toDateString();
}

