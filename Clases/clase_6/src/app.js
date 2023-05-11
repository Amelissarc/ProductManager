const express = require('express');

const app = express();

app.get('/saludo', (req, res) => {
    res.send('Hola a todos, mi primer servidos de express');
})

app.listen(8080, ()=> {
    console.log('servidor en express listo');   
})