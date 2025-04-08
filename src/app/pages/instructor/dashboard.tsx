// src/pages/instructor/dashboard.tsx
import { useRoleCheck } from "../../utils/auth";

const InstructorDashboard = () => {
  if (!useRoleCheck("instructor")) return null;

  return <div>Welcome Instructor!</div>;
};

export default InstructorDashboard;
