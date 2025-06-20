import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// components
import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./useAuthContext";
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.dashboard} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
