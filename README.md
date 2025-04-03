# Product Catalog Web Application

This project demonstrates a simple web application that displays a catalog of products using JavaScript and JSON. The application fetches product data from a JSON file and dynamically creates product cards to display them on the webpage.

## File Structure

- `js/script.js`: Contains the main JavaScript code for the application
- `datos/productos.json`: Contains the product data in JSON format

## Function Explanations

### script.js

#### 1. `cargarProductos()`
- **Purpose**: Asynchronously loads product data from the JSON file
- **Functionality**:
  - Makes a fetch request to `datos/productos.json`
  - Handles potential errors during the fetch operation
  - Returns an array of products or an empty array if there's an error
- **Error Handling**: Includes console error logging and fallback behavior

#### 2. `crearCardProducto(producto)`
- **Purpose**: Creates a product card element for display
- **Parameters**:
  - `producto`: An object containing product information
- **Functionality**:
  - Creates a card container with appropriate CSS classes
  - Adds product image with error handling (shows placeholder if image fails to load)
  - Displays product name, description, and price
  - Returns a complete HTML card element

#### 3. `mostrarProductos()`
- **Purpose**: Main function to display all products on the page
- **Functionality**:
  - Shows a loading message while fetching products
  - Clears the container and displays products
  - Shows a message if no products are available
  - Creates and appends product cards to the container

#### 4. Event Listener
- **Purpose**: Initializes the application when the DOM is loaded
- **Functionality**: Calls `mostrarProductos()` when the page is ready

### productos.json

The JSON file contains a collection of products with the following structure:

```json
{
    "productos": [
        {
            "id": number,
            "nombre": string,
            "descripcion": string,
            "precio": number,
            "imagen": string (URL)
        }
    ]
}
```

#### Product Properties
- `id`: Unique identifier for each product
- `nombre`: Product name
- `descripcion`: Detailed product description
- `precio`: Product price in decimal format
- `imagen`: URL to the product image

## Usage

1. The application automatically loads when the page is opened
2. Products are fetched from the JSON file
3. Each product is displayed in a card format with:
   - Product image
   - Product name
   - Product description
   - Product price

## Error Handling

- If the JSON file fails to load, an error message is logged to the console
- If product images fail to load, a placeholder image is displayed
- The application gracefully handles cases where no products are available

## Dependencies

- Modern web browser with JavaScript support
- No external libraries required 