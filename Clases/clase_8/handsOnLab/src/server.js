import express from 'express';
import routerMascotas from './routes/mascotas.router.js';
import routerUsers from './routes/users.router.js';

const app = express();

app.use(express.json());

app.use('/api/mascotas', routerMascotas);
app.use('/api/users', routerUsers);

app.listen(8080, () => {
    console.log("servidor levantado")
});

