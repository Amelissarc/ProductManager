import ViewsService from "../services/views.service.js";

export default class ViewsController {
    constructor(){
        this.viewsService = new ViewsService()
    }

    async getProductsController(){
        const result = await this.viewsService.getProudcts()
        return result
    }
}