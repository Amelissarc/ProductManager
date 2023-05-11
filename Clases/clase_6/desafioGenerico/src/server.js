const express = require('express');

const app = express();

app.get('/bienvenida', (req, res) => {
    res.send(`<h1 style="color:blue;">Bienvenido a mi servidor</h1>`);
})

app.get('/usuario', (req, res) => {
    res.send({
        nombre: 'Melissa',
        apellido: 'Rincón',
        edad: 25,
        correo: 'melissarincon@gmail.com'
    })
})

app.listen('8080', () => {
    console.log('servidor en escucha ')
});