const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Modelo
const Usuarios = require('../models/Usuarios');

// Local strategy - Login con credenciales propios (usuario y password)
passport.use(
    new LocalStrategy(
        {
            // Por default passport espera un usuario y password
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // Buscamos en la base de datos
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });

                // El usuario existe -> password incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    })
                }
                // El email existe  ->  password correcto
                return done(null, usuario);
            } catch (error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;