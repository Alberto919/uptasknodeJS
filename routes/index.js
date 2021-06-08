const { Router } = require('express');
const express = require('express');
const router = express.Router();
//Importar express validator
const {body} = require('express-validator/check');


const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');



module.exports = function(){
    //ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyectos);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //Listar Proyectos
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    
    //Actualizar el Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape(), proyectosController.actualizarProyecto);
    // Eliminar Proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto );
    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea );
    return router;
}