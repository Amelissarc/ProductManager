// Consigna:
/* Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1). */

/* 
La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

Debe guardar objetos con el siguiente formato:
id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 

Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
*/

const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextId = this.products[this.products.length - 1].id + 1;
            } else {
                this.nextId = 1;
            }
        } catch (err) {
            this.products = [];
            this.nextId = 1;
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

    saveToFile() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (err) {
            console.log('Error al guardar en archivo:', err);
        }
    }
}

// Ejemplo de uso:
const productManager = new ProductManager('./products.json');

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

// Actualizar un producto
productManager.updateProduct(1, {
title: 'Producto 1 (versión 2)',
description: 'Descripción del producto 1 (versión 2)',
price: 11.99,
thumbnail: 'https://example.com/product1-v2.jpg',
code: 'PROD1',
stock: 7
});

// Obtener el producto actualizado
const updatedProduct = productManager.getProductById(1);
console.log(updatedProduct);

// Eliminar un producto
productManager.deleteProduct(2);

// Obtener todos los productos luego de eliminar uno
const allProductsAfterDelete = productManager.getProducts();
console.log(allProductsAfterDelete);
