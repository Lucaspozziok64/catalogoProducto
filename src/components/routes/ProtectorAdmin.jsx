import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({ isAdmin }) => {
  //si no soy adinistrador
  if (!isAdmin) {
    return <Navigate to={'/'}></Navigate>
  }
  //si soy administrador muestro las rutas
  return <Outlet />
};

export default ProtectorAdmin;