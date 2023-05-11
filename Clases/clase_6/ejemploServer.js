const http = require('http');

const server = http.createServer((request, responde) => {
    response.end('Mi segundo hola mundo desde backend')
})

server.listen(8080,() => {
    console.log('escuchando en el puerto 8080')
})