import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProductoPorId } from "../../../helpers/queries";

const ItemProducto = ({ producto, fila }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "Eliminar Producto",
      text: "No puedes revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#146c43",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "cancelar",
    }).then(async(result) => {
      if (result.isConfirmed) {
        //Aqui borro efectivamente el 
        const respuesta = await borrarProductoPorId(producto._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto ${producto.nombreProducto} fue eliminado correctamente`,
            icon: "success",
          }); //Luego debo actualizar la tabla de productos
        }  else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `El producto ${producto.nombreProducto} no pudo ser eliminado`,
          icon: "error",
        });
      }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">{producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Button variant="warning" className="me-lg-2">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
