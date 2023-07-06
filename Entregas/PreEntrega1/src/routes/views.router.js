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

export default router;