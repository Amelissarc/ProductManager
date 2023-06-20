import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ManagerProducts from "./ProductsManager.class.js";
export default class ManagerCarts {
  connection = mongoose.connect('mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority')

  managerProducts = new ManagerProducts();

  createCart = async () => {
    const result = await cartModel.create(
      {products: []});
    return result;
  };

  getCartById = async (id) => {
    const result = await cartModel.findOne(
      { _id: id});
    return result;
  };

  getAllCart = async () => {
    const result = await cartModel.find({});
    return result;
  };

  addProductToCart = async (cid, pid) => {
    const product = await this.managerProducts.getProductById(pid)
    const cart = await this.getCartById(cid)
    cart.products.push({product: product})
    await cart.save()
    return;
  };
}
