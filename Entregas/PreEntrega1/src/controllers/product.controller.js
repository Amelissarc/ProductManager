import ProductService from "../services/products.service.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async createProductController(product) {
    const result = await this.productService.createProductService(product);
    return result;
  }
  async getProductsController(req) {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filtro = req.query.filtro;
    let filtroVal = req.query.filtroVal;
    const result = await this.productService.getProductsService(
      limit,
      page,
      sort,
      filtro,
      filtroVal
    );
    return result;
  }

  async getProductsByIdController(id) {
    if(!id){
        return {
            error: 'id vacio'
        }
    }
    const result = await this.productService.getProductsByIdService(id);
    return result;
  }
}