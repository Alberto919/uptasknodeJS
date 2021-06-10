const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');

// Autenticar el usuario - estrategia local
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/iniciar-sesion',
    failureFlash : true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Verifica si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {

    // si esta autenticado, adelante
    if(req.isAuthenticated()) {
        return next();
    }
    // si no esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        // redirigir al login
        res.redirect('/iniciar-sesion');
    })
}