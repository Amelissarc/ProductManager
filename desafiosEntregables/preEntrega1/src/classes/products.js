import { Router } from 'express';
import fs from 'fs';

const router = Router();
const products = [];
const path = './files/productos.json';

export default class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;
}

initialize = async () => {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.nextId = this.products[this.products.length - 1].id + 1;
      } else {
        this.nextId = 1;
      }
    } catch (err) {
      console.log('Error al leer el archivo:', err);
    }
  };

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.thumbnail ||
      !product.code ||
      !product.status ||
      !product.id ||
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
      const data = JSON.stringify(this.products, null, '\t');
      await fs.promises.writeFile(this.path, data);
    } catch (err) {
      console.log('Error al guardar en archivo:', err);
    }
  }
}

