import fs from 'fs/promises';
import { v4 as uuidV4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './files/products.json');
export default class ManagerProducts {

  constructor() {
    this.path = filePath;
    this.products = [];
  }

  async initialize() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (err) {
      console.log('Error al leer el archivo:', err);
    }

  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.thumbnail ||
      !product.code ||
      !product.status ||
      !product.stock
    ) {
      console.log('Error: todos los campos son obligatorios');
      return;
    }
    if (this.products.some(p => p.code === product.code)) {
      console.log('Error: el código ya existe');
      return;
    }
    product.id = uuidV4(); // Generar un nuevo ID único utilizando uuidV4()
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
      return null;
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



