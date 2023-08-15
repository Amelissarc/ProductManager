import ProductDAO from "../daos/mongodb/ProductsManager.class.js";

export default class ProductService {
  constructor() {
    this.productDao = new ProductDAO();
  }

  async createProductService(product) {
    const result = await this.productDao.addProduct(product);
    return result;
  }

  async getProductsService(limit, page, sort, filtro, filtroVal) {
    const result = this.productDao.getProducts(
      limit,
      page,
      sort,
      filtro,
      filtroVal
    );
    return result;
  }

  async getProductsByIdService(id) {
    const result = await this.productDao.getProductById(id);

    if (!result) {
      return {
        error: "producto no existe",
      };
    }
    return result;
  }
}