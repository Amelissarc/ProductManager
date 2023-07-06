import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

app.use(session({
    store: new MongoStore({
        mongoUrl :'mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority',
        ttl:15,
    }),
        secret:'mongoSecret',
        resave: true,
        saveUninitialized: false
}))

app.get('/', (req, res) => {
    req.session.user = req.query.name
    res.send('session set')
})

app.listen(8080,()=>{
    console.log('listening on')
})