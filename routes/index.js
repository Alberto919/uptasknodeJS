const { Router } = require('express');
const express = require('express');
const router = express.Router();
const proyectosControllers = require('../controllers/proyectosControllers');



module.exports = function(){
    // ruta para el home
    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto', proyectosControllers.formularioProyectos);
    router.post('/nuevo-proyecto', proyectosControllers.nuevoProyecto);
    return router;
}
