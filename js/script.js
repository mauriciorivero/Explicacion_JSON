// Función para cargar los datos del JSON
async function cargarProductos() {
    try {
        // Cargamos el JSON desde la carpeta /datos
        const respuesta = await fetch('datos/productos.json');
        
        // Verificamos si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        return datos.productos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        
        // En caso de error, mostramos un mensaje en la consola y devolvemos un array vacío
        console.log('Asegúrate de que el archivo /datos/productos.json existe y es accesible');
        return [];
    }
}

// Función para crear una card de producto
function crearCardProducto(producto) {
    // Crear elementos
    const cardProducto = document.createElement('div');
    cardProducto.className = 'card-producto';
    
    const imagenProducto = document.createElement('img');
    imagenProducto.className = 'imagen-producto';
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = producto.nombre;
    // Imagen de respaldo en caso de error
    imagenProducto.onerror = function() {
        this.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
    };
    
    const infoProducto = document.createElement('div');
    infoProducto.className = 'info-producto';
    
    const nombreProducto = document.createElement('h2');
    nombreProducto.className = 'nombre-producto';
    nombreProducto.textContent = producto.nombre;
    
    const descripcionProducto = document.createElement('p');
    descripcionProducto.className = 'descripcion-producto';
    descripcionProducto.textContent = producto.descripcion;
    
    const precioProducto = document.createElement('div');
    precioProducto.className = 'precio-producto';
    precioProducto.textContent = `$${producto.precio.toFixed(2)}`;
    
    // Construir la estructura de la card
    infoProducto.appendChild(nombreProducto);
    infoProducto.appendChild(descripcionProducto);
    infoProducto.appendChild(precioProducto);
    
    cardProducto.appendChild(imagenProducto);
    cardProducto.appendChild(infoProducto);
    
    return cardProducto;
}

// Función para mostrar todos los productos en el contenedor
async function mostrarProductos() {
    const contenedorProductos = document.getElementById('contenedor-productos');
    
    // Mostramos un mensaje de carga
    contenedorProductos.innerHTML = '<p>Cargando productos...</p>';
    
    const productos = await cargarProductos();
    
    // Limpiar el contenedor
    contenedorProductos.innerHTML = '';
    
    // Verificar si hay productos
    if (productos.length === 0) {
        contenedorProductos.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }
    
    // Recorrer y añadir cada producto
    productos.forEach(producto => {
        const cardProducto = crearCardProducto(producto);
        contenedorProductos.appendChild(cardProducto);
    });
}

// Iniciar la carga de productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', mostrarProductos);