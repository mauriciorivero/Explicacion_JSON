// Función para cargar los datos del JSON
async function cargarProductos() {
    try {
        // Verificar si hay datos en localStorage primero
        const datosLocalStorage = localStorage.getItem('productosData');
        if (datosLocalStorage) {
            return JSON.parse(datosLocalStorage).productos;
        }
        
        // Si no hay datos en localStorage, intentamos cargar desde el archivo JSON
        const respuesta = await fetch('datos/productos.json');
        
        // Verificamos si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        
        // Guardamos en localStorage para futuras referencias
        localStorage.setItem('productosData', JSON.stringify(datos));
        
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

// Función para guardar un nuevo producto en el JSON
async function guardarNuevoProducto(producto) {
    try {
        // Validar que el producto tenga los campos requeridos
        if (!producto.nombre || !producto.descripcion || !producto.precio) {
            throw new Error('El producto debe tener nombre, descripción y precio');
        }
        
        // Cargar los productos actuales
        const productos = await cargarProductos();
        
        // Asignar un ID al nuevo producto (el siguiente al máximo actual)
        const nuevoId = productos.length > 0 
            ? Math.max(...productos.map(p => p.id)) + 1 
            : 1;
        
        // Crear el nuevo producto con el ID asignado
        const nuevoProducto = {
            id: nuevoId,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: parseFloat(producto.precio),
            imagen: producto.imagen || 'https://via.placeholder.com/300x200?text=Nuevo+Producto'
        };
        
        // Agregar el producto al array
        productos.push(nuevoProducto);
        
        // Guardar en localStorage para persistencia en modo desarrollo
        localStorage.setItem('productosData', JSON.stringify({productos: productos}));
        
        console.log('Producto guardado exitosamente en localStorage');
        
        // Actualizar la visualización de productos en la interfaz
        // Creamos la nueva card y la añadimos al contenedor
        const contenedorProductos = document.getElementById('contenedor-productos');
        const cardProducto = crearCardProducto(nuevoProducto);
        contenedorProductos.appendChild(cardProducto);
        
        return true;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        alert('No se pudo guardar el producto. ' + error.message);
        return false;
    }
}

// Iniciar la carga de productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', mostrarProductos);