import { Router } from "express";
import fs from 'fs';
import ManagerProducts from "../clasess/ProductsManager.class.js";

const router = Router();
const filePath = '../clasess/files/products.json';
const managerProducts = new ManagerProducts(filePath);

// Middleware para inicializar managerProducts antes de procesar las solicitudes
router.use(async (req, res, next) => {
  try {
    await managerProducts.initialize();
    next();
  } catch (error) {
    console.log('Error al inicializar managerProducts:', error);
    res.status(500).send('Error al inicializar managerProducts');
  }
});

// Obtener todos los productos
router.get('/api/products', (req, res) => {
  try {
    const products = managerProducts.getProducts();
    res.send({ products });
  } catch (error) {
    console.log('Error al obtener todos los productos:', error);
    res.status(500).send('Error al obtener todos los productos');
  }
});

// Filtrar productos por precio
router.get('/filter', (req, res) => {
  try {
    const price = req.query.price;

    if (!price || (price !== '75' && price !== '25')) {
      const products = managerProducts.getProducts();
      res.send(products);
    } else {
      const priceFilter = managerProducts.getProducts().filter(
        (product) => product.price === parseFloat(price)
      );
      res.send(priceFilter);
    }
  } catch (error) {
    console.log('Error al filtrar productos por precio:', error);
    res.status(500).send('Error al filtrar productos por precio');
  }
});

// Obtener producto por ID
router.get('/product/:pid', (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = managerProducts.getProductById(id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.send(product);
  } catch (error) {
    console.log('Error al obtener producto por ID:', error);
    res.status(500).send('Error al obtener producto por ID');
  }
});

// Agregar un nuevo producto
router.post('/product', (req, res) => {
  try {
    const product = req.body;
    managerProducts.addProduct(product);
    res.send('Producto agregado exitosamente');
  } catch (error) {
    console.log('Error al agregar un nuevo producto:', error);
    res.status(500).send('Error al agregar un nuevo producto');
  }
});

// Actualizar un producto existente
router.put('/product/:pid', (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const newProduct = req.body;
    managerProducts.updateProduct(id, newProduct);
    res.send('Producto actualizado exitosamente');
  } catch (error) {
    console.log('Error al actualizar un producto existente:', error);
    res.status(500).send('Error al actualizar un producto existente');
  }
});

// Eliminar un producto
router.delete('/product/:pid', (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    managerProducts.deleteProduct(id);
    res.send('Producto eliminado exitosamente');
  } catch (error) {
    console.log('Error al eliminar un producto:', error);
    res.status(500).send('Error al eliminar un producto');
  }
});

export default router;


