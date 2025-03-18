import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Add your logout logic here (e.g., clear session, remove JWT token, etc.)
    // For example:
    localStorage.removeItem("authToken"); // Example for token removal
    sessionStorage.removeItem("authToken"); // Example for session storage
    // After logging out, redirect to homepage
    router.push("/"); // Redirect to homepage
  }, [router]);

  return null; // You can also display a loading spinner if desired
};

export default Logout;
