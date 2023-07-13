import { Router } from 'express';
import __dirname from "../utils.js"
import ManagerProducts from '../daos/mongodb/ProductsManager.class.js';


let managerProducts = new ManagerProducts()

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})

router.get("/home", async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filtro = req.query.filtro;
    let filtroVal = req.query.filtroVal;


    if (!limit) {
        limit = 9;
    }
    if (!page) {
        page = 1;
    }
    await managerProducts.getProducts(limit, page, sort, filtro, filtroVal).then(
        (product) => {
            let products = JSON.stringify(product.docs);
            products = JSON.parse(products);
            product.prevLink = product.hasPrevPage
                ? `http://localhost:8080/home/?page=${product.prevPage}`
                : "";
            product.nextLink = product.hasNextPage
                ? `http://localhost:8080/home/?page=${product.nextPage}`
                : "";
            product.isValid = !(page <= 0 || page > product.totalPages);


            res.render("home", {
                title: "Productos",
                products,
            });
        }
    );
});
export default router;