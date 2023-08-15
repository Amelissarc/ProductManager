import ProductService from "./products.service.js";

export default class ViewsService {
    constructor(){
        this.productsService = new ProductService()
    }

    async getProudcts(){
        const result = this.productsService.getProductsService()
        return result;
    }
}