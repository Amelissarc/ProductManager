import mongoose from 'mongoose'
import { productsModel } from './models/products.model.js'

export default class ManagerProducts {
  connection = mongoose.connect('mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority')

  async initialize() {
  }

  async addProduct(product) {
    let result = await productsModel.create(product) 
   return result;
  }

  async getProducts() {
    let result = await productsModel.create(product) 
    return result;
  }

  async getProductById(id) {
    let result = await productsModel.findOne(
      {_id: id})
    return result
  }

  async updateProduct(id, updatedProduct) {
    let result = await productsModel.updateOne(
      {_id: id}, 
      {$set: updatedProduct})
    return result;
  }

  async deleteProduct(id) {
    let result = await productsModel.deleteOne(
      {_id: id})
    return result
  }

  async saveToFile() {
    
  }
}



