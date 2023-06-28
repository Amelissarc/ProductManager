import mongoose from 'mongoose'
import { productsModel } from './models/products.model.js'

// Definición del modelo de productos BngzW3dc32sVJniM
export default class ManagerProducts {
  connection = mongoose.connect(
    'mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectarse a MongoDB Atlas:', err));

  async addProduct(product) {
    try {
      let result = await productsModel.create(product);
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getProducts(
    limit = 10,
    page = 1,
    sort = 0,
    filtro = null,
    filtroVal = null
  ) {
    let whereOptions = {};
    console.log(filtro, filtroVal);
    if (filtro != "" && filtroVal != "") {
      whereOptions = { [filtro]: filtroVal };
    }
    console.log(limit, page, sort);
    let result = await productsModel.paginate(whereOptions, {
      limit: limit,
      page: page,
      sort: { price: sort },
    });
    return result;
  }

  async getProductById(id) {
    let result = await productsModel.findOne({ _id: id });
    return result;
  }

  async updateProduct(id, updatedProduct) {
    let result = await productsModel.updateOne(
      { _id: id },
      { $set: updatedProduct }
    );
    return result;
  }

  async deleteProduct(id) {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}