"use server";

import { cookies } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Server action to delete a user.
 * @param userId The id of the user to delete
 * @param sessionId The id of the session to revoke
 */
export async function deleteUser(userId: string, sessionId: string) {
  const store = cookies();
  store.getAll().forEach((cookie) => {
    store.delete(cookie.name);
  });
  await clerkClient.sessions.revokeSession(sessionId);
  await clerkClient.users.deleteUser(userId);
}
