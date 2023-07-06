import { Router } from 'express';
import ManagerProducts from '../daos/mongodb/ProductsManager.class.js';
import __dirname from "../utils.js";

const router = Router();

let managerProducts = new ManagerProducts();

router.get('/', async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filtro = req.query.filtro;
    let filtroValor = req.query.filtroValor;

    const products = await managerProducts.getProducts(
      limit, 
      page, 
      sort, 
      filtro, 
      filtroValor
    );
    console.log(products.docs)
    res.render('home', {products});
  } catch (error) {
    console.log('Error al obtener todos los productos:', error);
    res.status(500).send('Error al obtener todos los productos');
  }
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  let product = await managerProducts.getProductById(id);

  if (!product) {
    res.send("No se encontró el producto");
    return;
  }

  res.send(product); // Se envian los productos en forma de objeto como pide la consigna
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  let newProduct = req.body;

  await managerProducts.addProduct(newProduct);
  const products = await managerProducts.getProducts();
  req.socketServer.sockets.emit("update-products", products);
  res.send({ status: "success" });
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let newProduct = req.body;

  await managerProducts.updateProduct(id, newProduct);

  res.send({ status: "success" });
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  let id = req.params.pid;

  await managerProducts.deleteProduct(id);

  res.send({ status: "success" });
});

export default router;




