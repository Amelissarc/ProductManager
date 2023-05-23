import express from 'express';
import ProductManager from './routes/products.js';
import cartsRouter  from './routes/carts.js';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('./files/productos.json');

// Middleware para inicializar ProductManager antes de procesar las solicitudes
app.use(async (req, res, next) => {
  try {
    await productManager.initialize();
    next();
  } catch (error) {
    console.log('Error al inicializar ProductManager:', error);
    res.status(500).send('Error al inicializar ProductManager');
  }
});

// Obtener todos los productos
app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.send({products});
});

// Filtrar productos por precio
app.get('/price', (req, res) => {
  const price = req.query.price;

  if (!price || (price !== '75' && price !== '25')) {
    const products = productManager.getProducts();
    res.send(products);
  } else {
    const priceFilter = productManager.getProducts().filter(product => product.price === parseFloat(price));
    res.send(priceFilter);
  }
});

// Obtener producto por ID
app.get('/product/:pid', (req, res) => {
  const id = parseInt(req.params.id);

  const product = productManager.getProductById(id);

  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }

  res.send(product);
});

// Agregar un nuevo producto
app.post('/product', (req, res) => {
  const product = req.body;
  productManager.addProduct(product);
  res.send('Producto agregado exitosamente');
});

// Actualizar un producto existente
app.put('/product/:pid', (req, res) => {
  const id = parseInt(req.params.id);
  const newProduct = req.body;
  productManager.updateProduct(id, newProduct);
  res.send('Producto actualizado exitosamente');
});

// Eliminar un producto
app.delete('/product/:pid', (req, res) => {
  const id = parseInt(req.params.id);
  productManager.deleteProduct(id);
  res.send('Producto eliminado exitosamente');
});

// Utilizar el enrutador de carritos
app.use('/carts', cartsRouter);

app.listen(port, () => {
  console.log(`El servidor está en marcha y funcionando en el puerto ${port}`);
});


/* nodemon app.js

Obtener todos los productos: GET /products
Filtrar productos por precio: GET /filter?price=precio
Obtener un producto por ID: GET /product/pid
Agregar un nuevo producto: POST /product
Actualizar un producto existente: PUT /product/pid
Eliminar un producto: DELETE /product/pid

*/