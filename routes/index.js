const { Router } = require('express');
const express = require('express');
const router = express.Router();
//Importar express validator
const {body} = require('express-validator/check');


const proyectosControllers = require('../controllers/proyectosControllers');




module.exports = function(){
    // ruta para el home
    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto', proyectosControllers.formularioProyectos);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.nuevoProyecto
    );

    //Listar Proyectos
    router.get('/proyectos/:url', proyectosControllers.proyectoPorUrl);
    
    return router;
}
