import { BrowserRouter, Route, Routes } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Login from "./components/pages/Login";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

function App() {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("userKey")) || false; // Se puede guardar con True o false
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
  }, [usuarioAdmin]);

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
        ></Menu>
        <main>
          <Routes>
            <Route
              path="/"
              element={<Inicio></Inicio>}
            ></Route>
            <Route path="/detalle" element={<DetalleProducto />}></Route>
            <Route
              path="/administrador/"
              element={<ProtectorAdmin isAdmin={usuarioAdmin} />}
            >
              <Route
                index
                element={
                  <Administrador
                  />
                }
              ></Route>
              <Route
                path="crear"
                element={
                  <FormularioProducto
                    titulo={"Crear producto"}
                  ></FormularioProducto>
                }
              ></Route>
              <Route
                path="editar/:id"
                element={
                  <FormularioProducto
                    titulo={"Editar producto"}
                  ></FormularioProducto>
                }
              ></Route>
            </Route>
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin} />}
            ></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
