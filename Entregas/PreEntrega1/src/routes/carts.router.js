import { Router } from "express";
import ManagerCarts from "../clasess/CartManager.class.js";

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
    res.send({ status: "success" });
  } catch (error) {
    console.log("Error al crear el carrito:", error);
    res.status(500).send("Error al crear el carrito");
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await managerCarts.agregarProductoEnCarrito(cartId, productId);
    res.send({ status: "success" });
  } catch (error) {
    console.log("Error al agregar producto en el carrito:", error);
    res.status(500).send("Error al agregar producto en el carrito");
  }
});

export default router;

