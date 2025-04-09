// src/components/sidebar/Sidebar.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import "../styles/sidebar/sidebar.css"; // Adjust the path if necessary


const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login"); // Redirect to login if the user is not authenticated
    return null;
  }

  const { role } = session.user;

  return (
    <div className="sidebar">
      <div>
        <p>Common Navigation Links</p>
        {/* Add general links */}
        <a href="/">Home</a>
      </div>

      {role === "admin" && (
        <div>
          <p>Admin Section</p>
          {/* Admin-specific links */}
          <a href="/admin/dashboard">Admin Dashboard</a>
        </div>
      )}

      {role === "student" && (
        <div>
          <p>Student Section</p>
          {/* Student-specific links */}
          <a href="/student/dashboard">Student Dashboard</a>
        </div>
      )}

      {role === "instructor" && (
        <div>
          <p>Instructor Section</p>
          {/* Instructor-specific links */}
          <a href="/instructor/dashboard">Instructor Dashboard</a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
