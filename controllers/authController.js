const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op;
const enviarEmail = require('../handlers/email');

// Autenticar el usuario - estrategia local
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Verifica si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {

    // si esta autenticado, adelante
    if (req.isAuthenticated()) {
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

// Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // Verificamos que el usuario existe
    const { email } = req.body
    // Buscamos por email
    const usuario = await Usuarios.findOne({ where: { email } });

    // Si no existe
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer');
    }

    // Si existe -> Generamos el token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000; //una hora
    //console.log(usuario.token);
    //console.log(usuario.expiracion);
    await usuario.save();

    // url de reestablecer
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

    // Enviar el Correo con el Token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });

    
    // terminar
    req.flash('correcto', 'Se envió un mensaje a tu correo');
    res.redirect('/iniciar-sesion');
}

// Reset Password
exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    // sino encuentra el usuario
    if (!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    })
}

// Cambia el password
exports.actualizarPassword = async (req, res) => {

    // Verifica el token y la fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });

    // Si el usuario existe
    if (!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer');
    }

    // hashear el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    // Guaradmos el nuevo password
    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');

}