/* 
Realizar una clase “ProductManager” que gestione un conjunto de productos.
Cada producto que gestione debe contar con las propiedades:
    title (nombre del producto)
    description (descripción del producto)
    price (precio)
    thumbnail (ruta de imagen)
    code (código identificador)
    stock (número de piezas disponibles)

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable

Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found” */

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }
    addProduct(product) {
        if (
            !product.title || 
            !product.description || 
            !product.price || 
            !product.thumbnail || 
            !product.code || 
            !product.stock
        ) {
            console.log('Error: todos los campos son obligatorios');
            return;
        }
        if (this.products.some(p => p.code === product.code)) {
            console.log('Error: el código ya existe');
            return;
        }
        product.id = this.nextId++;
        this.products.push(product);
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('Error: producto no encontrado');
            return;
        }
        return product;
    }
}

const productManager = new ProductManager();

// Agregar algunos productos
productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.99,
    thumbnail: 'https://example.com/product1.jpg',
    code: 'PROD1',
    stock: 5
});

productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 15.99,
    thumbnail: 'https://example.com/product2.jpg',
    code: 'PROD2',
    stock: 10
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por su ID
const productById = productManager.getProductById(1);
console.log(productById);

// Agregar un producto con un codigo que ya existe
productManager.addProduct({
    title: 'Producto 3',
    description: 'Descripción del producto 3',
    price: 12.99,
    thumbnail: 'https://example.com/product3.jpg',
    code: 'PROD1', // Este código ya existe
    stock: 8
});

// Para probar la funcionalidad de obtener un producto que no existe por su ID
const nonExistentProduct = productManager.getProductById(999);
console.log(nonExistentProduct);

// Para probar la funcionalidad con diferentes tipos de datos,
productManager.addProduct({
    title: 'Producto 4',
    description: 'Descripción del producto 4',
    price: 9.99,
    thumbnail: 'https://example.com/product4.jpg',
    // El campo "code" está faltando
    stock: '5' // El campo "stock" debería ser un número, no una cadena de texto
});

