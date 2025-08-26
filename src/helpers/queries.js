const urlProductos = import.meta.env.VITE_API_PRODUCTOS
// get, post, put, delete

console.log(urlProductos);

export const leerProductos = async (req, res) => {
    try {
        const respuesta = await fetch(urlProductos)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const obtenerProductosPorId = async (id) => {
    try {
        const respuesta = await fetch(urlProductos + `/${id}`)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const crearProducto = async (productoNuevo) => {
    try {
        const respuesta = await fetch(urlProductos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoNuevo)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const editarProducto = async (id) => {
    try {
        const respuesta = await fetch(urlProductos + `/${id}`, {
            method: 'DELETE'
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const borrarProductoPorId = async (productoEditado, id) => {
    try {
        const respuesta = await fetch(urlProductos + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoNuevo)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}