import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/carts.router.js';

const app = express();
const port = 8080;

// Configurar Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configurar Socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routerProducts);
app.use('/', routerCart);

server.listen(port, () => {
  console.log(`El servidor está en marcha y funcionando en el puerto ${port}`);
});


/* nodemon app.js
Obtener todos los productos: GET /api/products
Filtrar productos por precio: GET /filter?price=precio
Obtener un producto por ID: GET /product/pid
Agregar un nuevo producto: POST /product
Actualizar un producto existente: PUT /product/pid
Eliminar un producto: DELETE /product/pid
*/