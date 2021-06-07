const { Router } = require('express');
const express = require('express');
const routes = require('./routes');
const path = require('path');


// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(()=> console.log('Conectando al Servidor...'))
    .catch(error => console.log(error))

// crear una app de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname,'./views'));

//Habilitar bodyParser
app.use(express.urlencoded({extended:true}));

app.use('/', routes());
app.listen(3000);

