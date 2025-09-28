// index.js

// URL base de la API FakeStore
const API_URL = 'https://fakestoreapi.com/products';

// Capturamos los argumentos de la línea de comandos
// process.argv = ['node', 'index.js', 'GET', 'products/1']
const [ , , method, path, ...params] = process.argv;

// Función para obtener todos los productos
const getAllProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        console.log('Lista completa de productos:', products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

// Función para obtener un producto específico por su ID
const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        console.log(`Detalles del producto ${id}:`, product);
    } catch (error) {
        console.error(`Error al obtener el producto ${id}:`, error);
    }
};

// Función para crear un nuevo producto
const createProduct = async ([title, price, category]) => {
    if (!title || !price || !category) {
        console.error('Error: Debes proporcionar título, precio y categoría.');
        return;
    }
    
    try {
        const newProduct = {
            title,
            price: parseFloat(price), // El precio debe ser un número
            category,
            description: 'Un nuevo producto increíble', // Campos extra requeridos por la API
            image: 'https://i.pravatar.cc'
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const product = await response.json();
        console.log('Producto creado exitosamente:', product);
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};

// Función para eliminar un producto por su ID
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const deletedProduct = await response.json();
        console.log(`Producto ${id} eliminado exitosamente:`, deletedProduct);
    } catch (error) {
        console.error(`Error al eliminar el producto ${id}:`, error);
    }
};

// Lógica principal para dirigir el flujo según los comandos
const main = () => {
    const [resource, id] = path ? path.split('/') : [null, null];

    if (resource !== 'products') {
        console.error('Comando no válido. Usa el recurso "products".');
        return;
    }

    switch (method) {
        case 'GET':
            if (id) {
                getProductById(id);
            } else {
                getAllProducts();
            }
            break;
        case 'POST':
            createProduct(params);
            break;
        case 'DELETE':
            if (id) {
                deleteProduct(id);
            } else {
                console.error('Debes especificar un ID de producto para eliminar.');
            }
            break;
        default:
            console.error('Método no soportado. Usa GET, POST o DELETE.');
            break;
    }
};

// Ejecutamos la función principal
main();