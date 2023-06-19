import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const path = "./classes/files/carts.json";

export default class ManagerCarts {
  consultarCarts = async () => {
    try {
      console.log("existe", fs.existsSync(path));
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error al consultar los carritos:", error);
      throw error;
    }
  };

  crearCart = async () => {
    try {
      const carts = await this.consultarCarts();
      carts.push({ id: uuidV4(), products: [] });
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log("Error al crear el carrito:", error);
      throw error;
    }
  };

  consultarCartPorId = async (id) => {
    try {
      const carts = await this.consultarCarts();

      const cart = carts.find((cart) => cart.id == id);

      return cart ? cart : "Carrito no encontrado";
    } catch (error) {
      console.log("Error al consultar el carrito por ID:", error);
      throw error;
    }
  };

  agregarProductoEnCarrito = async (idCart, idProduct) => {
    try {
      const carts = await this.consultarCarts();

      const cartIndex = carts.findIndex((cart) => cart.id == idCart);

      if (cartIndex === -1) {
        console.log("Carrito no encontrado");
        return;
      }

      const cart = carts[cartIndex];

      const productIndex = cart.products.findIndex((product) => product.id == idProduct);

      if (productIndex === -1) {
        cart.products.push({ id: idProduct, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }

      carts[cartIndex] = cart;

      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log("Error al agregar producto en el carrito:", error);
      throw error;
    }
  };
}
