import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/zustand/useAuthStore";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
