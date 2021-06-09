const { Router } = require('express');
const express = require('express');
const routes = require('./routes');
const path = require('path');

// Helpers
const helpers = require('./helpers')


// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectando al Servidor...'))
    .catch(error => console.log(error))

// crear una app de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

// Pasar var dump a la app
app.use((req, res, next) => {
    console.log('Yo soy un middleware');
    next();
})

// Pasar var dump a la app
app.use((req, res, next) => {
    console.log('Yo soy otro middleware');
    next();
})

//Habilitar bodyParser
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());
app.listen(3000);

