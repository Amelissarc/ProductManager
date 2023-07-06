import { Router } from 'express';
import userModel from '../models/Users.model.js';

const router = Router()

router.post('/register', async (req, res) => {
    const { 
        firts_name,
        last_name,
        email,
        age,
        password,
    }
    = req.body

    const exist = await userModel.modelName.findOne( {email} );

    if(exist) return res.status(400).send({status:error, message: ' usuario ya registrado'});

    let result = await userModel.create({
        firts_name,
        last_name,
        email,
        age,
        password,
    })
    .send({status:error, message: ' usuario registrado'})
})

router.post('/login', async (req, res) => {
    const {
        email,
        password,
    }
    = req.body;

    const user = await userModel.findOne({email: email, password: password})

    if(!req) return res.send({status:error, message: ' usuario no encontrado'});
    req.session.user = {
        name: user.firts_name + user.last_name,
        email: user.email,
        age: user.age
    }
    res.send({status:error, message: req.session.user});
})

export default router