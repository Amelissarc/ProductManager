import express from 'express';

const app = express();

app.use(express.json());

let frase = 'frase inicial'

app.get('/api/frase', (req, res) => {
    res.send({ frase });
});

app.get('/api/palabra/:pos', (req, res) =>{
    const pos = req.params.pos;
    if(isNaN(pos)) return res.status(404).send({message: 'pos debe ser un numero'})
    const palabras = frase.split(' ')
    
    res.send({palabra: palabras[pos - 1]});
});

app.post('/api/palabras/', (req, res) => {
    const palabra = req.body.palabra;
    frase = frase + ' ' + palabra;
    res.send({palabra, pos: frases.split(' ').length});
});

app.delete('/api/palabras/:pos', (req, res) => {
    const pos = req.params.pos = pos;
    if (isNaN(pos)) 
    return res.status(404).send({message: "pos debe ser un numero"});
    const palabras = frase.split(' ');
    palabras.splice(pos -1, 1);
    frase = palabras.join(' ');
    res.send({ frase });
});

app.put('/api/palabras/:pos', (req, res	) => {
    const pos = req.params.pos = pos;
    const palabraNueva = req.body.palabra;
    if (isNaN(pos)) 
    return res.status(404).send({message: "pos debe ser un numero"});
    const palabras = frase.split(' ');

    const anterior = palabras[pos-1]; // se guarda la palabra anterior
    palabras[pos-1] = palabraNueva;
    frase = palabras.join(' ')
    res.send({anterior})

});

app.listen(8080,()=>{
    console.log('servidor levantado')
});