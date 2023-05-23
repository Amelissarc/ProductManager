import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const cartsRouter = express.Router();

// Ruta raíz POST /api/carts/
cartsRouter.post('/', (req, res) => {
  // Crear un nuevo carrito con una estructura única de ID
  const newCart = {
    id: generateUniqueId(), // Generar un ID único para el carrito
    products: [] // Array vacío para contener los productos del carrito
  };

  res.send('Nuevo carrito creado exitosamente');
});

// Ruta GET /api/carts/:cid
cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;

  // Obtener los productos del carrito con el ID proporcionado (cartId)
  const cartProducts = getCartProducts(cartId);

  if (!cartProducts) {
    return res.status(404).send('Carrito no encontrado');
  }

  res.send(cartProducts);
});

// Ruta POST /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const quantity = req.body.quantity || 1; // Cantidad de productos a agregar (por defecto, 1)

  // Verificar si el carrito con el ID proporcionado (cartId) existe
  const cartExists = checkCartExists(cartId);

  if (!cartExists) {
    return res.status(404).send('Carrito no encontrado');
  }

  // Obtener el producto con el ID proporcionado (productId)
  const product = getProduct(productId);

  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }

  // Agregar el producto al arreglo "products" del carrito seleccionado
  addProductToCart(cartId, product, quantity);

  res.send('Producto agregado al carrito exitosamente');
});

function generateUniqueId() {
  return uuidv4();
}

// Función para obtener los productos del carrito con el ID proporcionado
function getCartProducts(cartId) {
  const cart = carts.find((cart) => cart.id === cartId);
  return cart ? cart.products : null;
}

// Función para verificar si el carrito con el ID proporcionado existe
function checkCartExists(cartId) {
  return carts.some((cart) => cart.id === cartId);
}

// Función para obtener el producto con el ID proporcionado
function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

// Función para agregar el producto al arreglo "products" del carrito seleccionado
function addProductToCart(cartId, product, quantity) {
  const cart = carts.find((cart) => cart.id === cartId);
  if (cart) {
    cart.products.push({ product: product.id, quantity });
  }
}

export default cartsRouter ;
