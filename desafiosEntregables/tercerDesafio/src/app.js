import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('./products.json');

// Inicializar ProductManager y cargar los productos desde el archivo
productManager.initialize().then(() => {
  console.log('ProductManager inicializado.');

  // Definir ruta para obtener todos los productos
  app.get('/', (req, res) => {
    const allProducts = productManager.getProducts();
    res.send(allProducts);
  });

  // Definir ruta para filtrar productos por precio
  app.get('/filter', (req, res) => {
    const price = req.query.price;

    if (!price || (price !== '15.99' && price !== '11.99')) {
      return res.send(productManager.getProducts());
    }

    const priceFilter = productManager.getProducts().filter(product => product.price === parseFloat(price));
    res.send(priceFilter);
  });

  // Definir ruta para obtener un producto por su código
  app.get('/code/:id', (req, res) => {
    const id = req.params.id;

    const product = productManager.getProducts().find(product => product.code === id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.send(product);
  });

  app.listen(port, () => {
    console.log(`El servidor está en marcha y funcionando en el puerto ${port}`);
  });
}).catch(error => {
  console.log('Error al inicializar ProductManager:', error);
});
