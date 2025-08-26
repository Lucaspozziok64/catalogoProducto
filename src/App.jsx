import { BrowserRouter, Route, Routes } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import CardProducto from "./components/pages/producto/CardProducto";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Login from "./components/pages/Login";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import { v4 as uuidv4 } from "uuid";

function App() {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("userKey")) || false; // Se puede guardar con True o false
  const productosLocalStorage = JSON.parse(localStorage.getItem('catalogoProdutos')) || [];
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const [productos, setProductos] = useState(productosLocalStorage)

  useEffect(()=> {
    localStorage.setItem('catalogoProdutos', JSON.stringify(productos))
  }, [productos])

  const crearProducto = (productoNuevo)=> {
    //Agregar un id unico al producto nuevo
    productoNuevo.id = uuidv4();
    //agregar el prodcto al state de productos
    setProductos([...productos, productoNuevo])
    return true
  }

  const borrarProducto = (idProducto)=> {
    const productosFiltrados = productos.filter((ItemProducto)=> ItemProducto.id !== idProducto)
    setProductos(productosFiltrados)
    return true
  }

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
        ></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio productos={productos}></Inicio>}></Route>
            <Route path="/detalle" element={<DetalleProducto />}></Route>
            <Route
              path="/administrador/"
              element={<ProtectorAdmin isAdmin={usuarioAdmin} />}
            >
              <Route index element={<Administrador setProductos={setProductos} productos={productos} borrarProducto={borrarProducto} />}></Route>
              <Route
                path="crear"
                element={<FormularioProducto titulo={'Crear producto'} crearProducto={crearProducto}></FormularioProducto>}
              ></Route>
              <Route
                path="editar/:id"
                element={<FormularioProducto titulo={'Editar producto'}></FormularioProducto>}
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
