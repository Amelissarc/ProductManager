import { Router } from "express";

const router = Router();

const mascotas = []

router.get('/', (req, res) => {
    res.send({mascotas});
});

router.post('/', (req, res) => {
    const mascota = req.body
    mascotas.push(mascota);
    res.send({status: 'success'});
});

export default router;