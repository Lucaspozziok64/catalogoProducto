import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { leerProductos } from "../../helpers/queries";
import { useEffect, useState } from "react";

const Inicio = ({ productos }) => {
  const [listaProductos, setListaProductos] = useState([])

    useEffect(()=> {
    obtenerProductos();
  }, [])

  const obtenerProductos =async ()=> {
    const respuesta = await leerProductos()
    if(respuesta.status === 200) {
      const datos = await respuesta.json()
      setListaProductos(datos)
    } else {
      console.log('Ocurrio un error al intentar leer los productos')
    }
  }
  
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/13591748/pexels-photo-13591748.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5">
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        {!productos ||
          (listaProductos.length === 0 && (
            <h1 className="text-center text-danger mt-5">
              No hay productos disponibles
            </h1>
          ))}

        <Row>
          {listaProductos.map((producto) => (
            <CardProducto key={producto._id} producto={producto} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
