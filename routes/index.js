const { Router } = require('express');
const express = require('express');
const router = express.Router();
const proyectosControllers = require('../controllers/proyectosControllers');



module.exports = function(){
    // ruta para el home
    router.get('/', proyectosControllers.proyectosHome);
    return router;
}
