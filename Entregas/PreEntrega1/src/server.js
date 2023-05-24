import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products/', routerProducts);
app.use('/carts/', routerCart);

app.listen(port, () => {
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