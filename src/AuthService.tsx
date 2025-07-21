import { Outlet, Navigate } from "react-router-dom";

const AuthService = () => {
  const token = sessionStorage.getItem('selectedProgram');

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthService;