//Módulos
const express = require ('express');
const session = require ('express-session');
const cookie = require ('cookie-parser');
const path = require ('path');
const method = require ('method-override');
const app = express(); 


const userLoggedMiddlewares = require('./middlewares/userLoggedMiddlewares');


//Server Start
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => console.log('Servidor esta corriendo en http://localhost:'+app.get("port")));

// View Engine
app.set('view engine', 'ejs')
app.set("views",path.resolve(__dirname,"./views"));

//----Middlewares App-----
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: "digital"})) // req.session
app.use(cookie()); // req.cookie
app.use(userLoggedMiddlewares);

// Custom Middleware
app.use(require("./middlewares/userSession"))

//Data Configuration
app.use(express.urlencoded({ extended: false })); //para el body
app.use(method('_method')); //para metodos put y delete


//Archivos Estáticos
app.use(express.static(path.resolve(__dirname,'../public')));



//Rutas
const mainRouter = require('./routes/mainRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const productApiRouter = require('./routes/api/productApiRoutes')
app.use('/', mainRouter);
app.use('/usuarios', userRouter);
app.use('/productos', productRouter);
app.use('/user', userRouter);
app.use('/api', productApiRouter);




// app.get('/',(req,res)=>{res.render('home')})
// app.get('/carrito',(req,res)=>{res.render('carrito')})
// app.get('/detalle',(req,res)=>{res.render('detalle')})
// app.get('/login',(req,res)=>{res.render('login')})
// app.get('/registro',(req,res)=>{res.render('registro')})


