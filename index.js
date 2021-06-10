const { Router } = require('express');
const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// Helpers
const helpers = require('./helpers')


// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectando al Servidor...'))
    .catch(error => console.log(error))

// crear una app de express
const app = express();

//Habilitar Pug
app.set('view engine', 'pug');

//Donde cargar los archivos estaticos
app.use(express.static('public'));


//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Flash messages
app.use(flash());

//Habilita las sesiones
app.use(session({ 
    secret: "secreta", 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes= req.flash(),
    next();
})

//Habilitar bodyParser
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());
app.listen(3000);

