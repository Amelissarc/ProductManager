import { Router } from "express";
import ManagerCarts from "../daos/filesystem/CartManager.class.js";
import __dirname from '../utils.js';

const router = Router();
const managerCarts = new ManagerCarts();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await managerCarts.consultarCartPorId(id);
    res.send(cart);
  } catch (error) {
    console.log("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito por ID");
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await managerCarts.consultarCarts();
    res.send(carts);
  } catch (error) {
    console.log("Error al obtener los carritos:", error);
    res.status(500).send("Error al obtener los carritos");
  }
});

router.post("/", async (req, res) => {
  try {
    await managerCarts.crearCart();
    const response = { status: "success" };
    res.send(response);
  } catch (error) {
    console.log("Error al crear el carrito:", error);
    res.status(500).send("Error al crear el carrito");
  }
});

router.post("/:cid/products/:pid", async ({ params }, res) => {
  try {
    const { cid, pid } = params;

    await managerCarts.agregarProductoEnCarrito(cid, pid);
    const response = { status: "success" };
    res.send(response);
  } catch (error) {
    console.log("Error al agregar producto en el carrito", error);
    res.status(500).send("Error al agregar producto en el carrito");
  }
});

export default router;

