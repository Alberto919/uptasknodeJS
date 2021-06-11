const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res) => {
    //console.log(res.locals.mensajes);
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina : 'Iniciar Sesión en UpTask', 
        error
    })
}

exports.crearCuenta = async (req, res) => {
    //console.log(req.body);
    // Leer los datos
    const { email, password } = req.body;
    try {
        // crear el usuario
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina : 'Crear Cuenta en Uptask',
            email,
            password
        })
    }
}

// Reestablecer contraseña
exports.validarToken = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}
