// Stub auth — in the real app this hits your DB / session store.
// Returns a plan-aware user object based on a cookie.

import { cookies } from "next/headers";

export type Plan = "free" | "pro";

export interface User {
  id: string;
  email: string;
  plan: Plan;
}

export function getUser(): User | null {
  const c = cookies();
  const id = c.get("user_id")?.value;
  if (!id) return null;
  const planCookie = c.get("user_plan")?.value;
  const plan: Plan = planCookie === "pro" ? "pro" : "free";
  return { id, email: `${id}@example.test`, plan };
}

export function requirePlan(required: Plan, user: User | null): boolean {
  if (!user) return false;
  if (required === "free") return true;
  return user.plan === required;
}
