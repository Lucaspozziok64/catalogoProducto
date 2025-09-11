import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({ isAdmin }) => {
  //si no soy adinistrador
  if (!isAdmin.token) {
    return <Navigate to={'/'}></Navigate>
  }
  //si soy administrador muestro las rutas
  return <Outlet />
};

export default ProtectorAdmin;