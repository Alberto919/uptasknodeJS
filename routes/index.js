const { Router } = require('express');
const express = require('express');
const router = express.Router();
//Importar express validator
const { body } = require('express-validator/check');


const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function () {
    //ruta para el home
    router.get('/', 
            authController.usuarioAutenticado,
            proyectosController.proyectosHome
    );


    router.get('/nuevo-proyecto', 
            authController.usuarioAutenticado,
            proyectosController.formularioProyectos
    );

    router.post('/nuevo-proyecto',
            authController.usuarioAutenticado,
            body('nombre').not().isEmpty().trim().escape(),
            proyectosController.nuevoProyecto
    );

    //Listar Proyectos
    router.get('/proyectos/:url', 
            authController.usuarioAutenticado,
            proyectosController.proyectoPorUrl
            
    );

    //Actualizar el Proyecto
    router.get('/proyecto/editar/:id',
            authController.usuarioAutenticado, 
            proyectosController.formularioEditar
    );


    router.post('/nuevo-proyecto/:id', 
            authController.usuarioAutenticado,
            body('nombre').not().isEmpty().trim().escape(), 
            proyectosController.actualizarProyecto
    );

    // Eliminar Proyecto
    router.delete('/proyectos/:url', 
            authController.usuarioAutenticado,
            proyectosController.eliminarProyecto
    );

    // Tareas
    router.post('/proyectos/:url', 
            authController.usuarioAutenticado,
            tareasController.agregarTarea
    );

    // Actualizar Tarea
    router.patch('/tareas/:id', 
            authController.usuarioAutenticado,
            tareasController.cambiarEstadoTarea
    );

    // Eliminar Tarea
    router.delete('/tareas/:id', 
            authController.usuarioAutenticado,
            tareasController.eliminarTarea
    );

    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);
    
    // Iniciar sesión
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    
    // Cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    // Reestablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);
    
    return router;
}