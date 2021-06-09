const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');


exports.proyectosHome = async(req, res)=>{
    //Obtengo todos los proyectos
    const proyectos = await Proyectos.findAll();
    
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyectos = async(req, res)=>{
    //Obtengo todos los proyectos
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async(req, res)=>{
    //Obtengo todos los proyectos
    const proyectos = await Proyectos.findAll();
    //Ver en consola
    console.log(req.body);
    // validar el input
    const { nombre } = req.body;
    let errores = [];

    if(!nombre){
        errores.push({'texto':'Agrega un nombre al proyecto'});
    }

    //hay errores?
    console.log(errores);
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{
        //No hay errores
        const proyecto = await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

    // Consultar tareas del Proyecto actual

    const tareas = await Tareas.findAll({
        where: {
            ProyectoId : proyecto.id
        },
        // include: [
        //     { model: Proyectos }
        // ]
    });

    if(!proyecto) return next();
    // render a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos, 
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    //Obtengo todos los proyectos
    const proyectosPromise = Proyectos.findAll();
    
    //Ver en consola
    console.log(req.body);

    //Obtengo un unico proyectos
    const proyectoPromise = Proyectos.findOne({
        where:{
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise])

    // render a la vista
    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    //Obtengo todos los proyectos
    const proyectos = await Proyectos.findAll();

    // validar que tengamos algo en el input
    const nombre = req.body.nombre;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    // si hay errores
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores
        // Actualiza en la BD.
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }} 
        );
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    // console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});

    //Si no hubo nungun resultado
    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
}