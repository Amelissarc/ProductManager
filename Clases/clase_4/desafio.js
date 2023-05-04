//Almacenar fecha y hora

const fs = require('fs') // importando

const fecha = new Date().toLocaleDateString()
const hora = new Date().toLocaleTimeString()

fs.writeFile(
    './fechayhora.txt', 
    'Fecha: ' + fecha + 'Hora: ' + hora,
  (error) => {
    if(error) return console.log(error);
    fs.readFile('./fechayhora.txt', 'utf-8', (error,resultado) => {
        if(error) return console.log(error);
        console.log(resultado)
    })
  }
);  