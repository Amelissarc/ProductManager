import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';
import sessionRouter from './routes/session.route.js';
import mongoose from 'mongoose';
import handlebars from 'handlebars';


const app = express();
const connections = mongoose.connect('mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority', {userNewUrlParse: true, useUnifiedTopology: true}
);

app.use(express.json()),
app.use(express.urlencoded({extended:true})),
app.use(express.static(__dirname + '/public'))

app.use(session({
    store: new MongoStore({
        mongoUrl :'mongodb+srv://melissarinconft:BngzW3dc32sVJniM@cluster0.lv4zutu.mongodb.net/?retryWrites=true&w=majority',
        ttl:15,
    }),
        secret:'mongoSecret',
        resave: true,
        saveUninitialized: false
}))

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname +'/views');
app.set('view engine','handlebars')

app.use('/', viewsRouter);
app.use('/api/sessions', viewsRouter);

app.get('/', (req, res) => {
    req.session.user = req.query.name;
    res.send('session set')
})

app.listen(8080,()=>{
    console.log('listening on')
})