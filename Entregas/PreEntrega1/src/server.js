import express from 'express';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';

import routerProducts from './routes/products.router.js';
import routerCart from './routes/carts.router.js';
import routerViews from './routes/views.router.js';
import __dirname from './utils.js'
import ManagerProducts from './daos/mongodb/ProductsManager.class.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use(express.static(__dirname + "/public"));

app.use('/', routerProducts);
app.use('/', routerCart);

// Configurar Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');

// routers

app.use("/", routerViews);

app.use("/products", routerProducts);
app.use("/carts", routerCart);

// server start and socket io
const server = app.listen(8080, () => console.log("Servidor levantado"))
const socketServer = new Server(server)
socketServer.on("connection", async (socket) => {
  console.log("Estás conectado " + socket.id)

  let managerProducts = new ManagerProducts()

  // Se envían todos los productos al conectarse
  socket.emit("update-products", await managerProducts.getProducts())

  // Se agrega el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("add-product", async (productData) => {
    await managerProducts.addProduct(productData)
    socketServer.emit("update-products", await managerProducts.getProducts())
  })

  // Se elimina el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("delete-product", async (productID) => {
    await managerProducts.deleteProduct(productID)
    socketServer.emit("update-products", await managerProducts.getProducts())
  })
});


/* nodemon app.js
Obtener todos los productos: GET /api/products
Filtrar productos por precio: GET /filter?price=precio
Obtener un producto por ID: GET /product/pid
Agregar un nuevo producto: POST /product
Actualizar un producto existente: PUT /product/pid
Eliminar un producto: DELETE /product/pid
*/