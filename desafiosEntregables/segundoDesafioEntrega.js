import fs from 'fs';

const path = "./products.json";

export default class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        
        this.products = [];
        this.nextId = 1;
    }

    initialize = async() => {
        try {
            const data = await fs.promises.readFile(filePath, 'utf-8');
            console.log(data);
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextId = this.products[this.products.length - 1].id + 1;
            } else {
                this.nextId = 1;
            }
        } catch (err) {
            console.log('Error al leer el archivo:', err);
        }
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
        this.saveToFile();
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

    updateProduct(id, newProduct) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        newProduct.id = id;
        this.products[index] = newProduct;
        this.saveToFile();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        this.products.splice(index, 1);
        this.saveToFile();
    }

    async saveToFile() {
        try {
            const data = JSON.stringify(path, null, '\t');
            await fs.promises.writeFile(this.path, data);
        } catch (err) {
            console.log('Error al guardar en archivo:', err);
        }
    }
    
}

// Ejemplo de uso:
const run = async() => {
    const productManager = new ProductManager();

    // Agregar un producto
    await productManager.addProduct({
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 10.99,
        thumbnail: 'https://example.com/product1.jpg',
        code: 'PROD1',
        stock: 5
    });

    // Agregar otro producto
    await productManager.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 15.99,
        thumbnail: 'https://example.com/product2.jpg',
        code: 'PROD2',
        stock: 10
    });

    // Obtener todos los productos
    const allProducts = await productManager.getProducts();
    console.log(allProducts);

    // Obtener un producto por su ID
    const productById = await productManager.getProductById(1);
    console.log(productById);

    // Actualizar un producto
    await productManager.updateProduct(1, {
        title: 'Producto 1 (versión 2)',
        description: 'Descripción del producto 1 (versión 2)',
        price: 11.99,
        thumbnail: 'https://example.com/product1-v2.jpg',
        code: 'PROD1',
        stock: 7
    });

    // Obtener el producto actualizado
    const updatedProduct = await productManager.getProductById(1);
    console.log(updatedProduct);

    // Eliminar un producto
    await productManager.deleteProduct(2);

    // Obtener todos los productos luego de eliminar uno
    const allProductsAfterDelete = await productManager.getProducts();
    console.log(allProductsAfterDelete);

    // Agregar otro producto
    await productManager.addProduct({
        title: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 20.99,
        thumbnail: 'https://example.com/product3.jpg',
        code: 'PROD3',
        stock: 3
    });

    // Obtener todos los productos luego de agregar uno
    const allProductsAfterAdd = await productManager.getProducts();
    console.log(allProductsAfterAdd);
}

// Ejecutar la función
run();

