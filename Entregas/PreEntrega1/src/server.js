import express, { json, urlencoded } from 'express';
import exphbs from 'express-handlebars';
import {Server} from 'socket.io';
import routerProducts from './routes/products.router.js';
import MongoStore from "connect-mongo";
import routerCart from './routes/carts.router.js';
import routerViews from './routes/views.router.js';
import __dirname from './utils.js'
import ManagerProducts from './daos/mongodb/ProductsManager.class.js';
import { intializePassport } from './config/passport.config.js';
import passport from "passport";

const app = express();
const managerProducts = new ManagerProducts();
const connection = mongoose.connect(
  "mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority",

);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static
app.use(express.static(__dirname + "/public"));

intializePassport()
app.use(
  session({
    store: new MongoStore({
      mongoUrl:"mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: "mongoSecret",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize())

// Configurar Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');

// routers
app.use("/products", routerProducts);
app.use("/carts", routerCart);

app.use("/", routerViews)
app.use("/api/sessions", sessionsRouter);

const products =  managerProducts.getProducts();
app.get('/', (req, res) => {
    res.render('home', {products})
})

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
  app.use('/realtimeproducts/', routerRealTimeProducts)
});

export default socketServer;