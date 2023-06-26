import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ManagerProducts from "./ProductsManager.class.js";
export default class ManagerCarts {
  connection = mongoose.connect(
    'mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority'
  )

  managerProducts = new ManagerProducts();
  
  async createCart() {
    const result = await cartModel.create({ products: [] });
    return result;
  }

  async getCartById(id) {
    const result = await cartModel
      .findOne({ _id: id })
      .populate("products.product");
    console.log(result);
    return result;
  }

  async getAllCarts() {
    const result = await cartModel.find();
    return result;
  }

  async addProductToCart(cid, pid) {
    const product = await this.managerProducts.getProductById(pid);
    const cart = await this.getCartById(cid);
    cart.products.push({ product: product });
    await cart.save();
    return;
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await this.getCartById(cid);
    cart.products.pull(pid);
    await cart.save();
    return;
  }

  async deleteAllProductsFromCart(cid) {
    const cart = await this.getCartById(cid);
    cart.products = [];
    await cart.save();
    return;
  }
}
