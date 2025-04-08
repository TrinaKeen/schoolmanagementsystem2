// src/utils/auth.ts
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useRoleCheck = (role: string) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user.role !== role) {
    router.push("/unauthorized"); // Redirect if the user does not have the required role
    return false;
  }

  return true;
};
