import { Router } from "express";
import ManagerCarts from "../daos/mongodb/CartManager.class.js";
import __dirname from '../utils.js';

const router = Router();

let managerCarts = new ManagerCarts();


router.get("/:cid", async (req, res) => {
  let id = req.params.cid;

  let cart = await managerCarts.getCartById(id);

  if (!cart) {
    res.send("No se encontró el carrito");
    return;
  }

  res.send(cart);
});

router.get("/", async (req, res) => {
  let carts = await managerCarts.getAllCarts();

  if (!carts) {
    res.send("No se encontró el carrito");
    return;
  }

  res.send(carts);
});

router.post("/", async (req, res) => {
  await managerCarts.createCart();

  res.send({ status: "success" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;

  await managerCarts.addProductToCart(cartId, productId);

  res.send({ status: "success" });
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;

  await managerCarts.deleteProductFromCart(cartId, productId);

  res.send({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  await managerCarts.deleteAllProductsFromCart(cartId);
  res.send({ status: "success" });
});

export default router;

