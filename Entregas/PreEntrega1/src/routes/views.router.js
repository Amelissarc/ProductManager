import { Router } from 'express';
import __dirname from "../utils.js"
import ManagerProducts from '../daos/mongodb/ProductsManager.class.js';


let managerProducts = new ManagerProducts()

const router = Router();

router.get('/', (req,res)=>{


  res.render('realTimeProducts');
})

export default router;