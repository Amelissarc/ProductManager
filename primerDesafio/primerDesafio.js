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

// Agregaando productos:
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

// Para obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Para obtener un producto por su ID
const productById = productManager.getProductById(1);
console.log(productById);

// Para agregar un producto con un codigo que ya existe
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
