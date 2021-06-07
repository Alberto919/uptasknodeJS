const Proyectos = require('../models/Proyectos');
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

exports.proyectoPorUrl = async(req,res,next)=>{
    //Obtengo todos los proyectos
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where:{
            url: req.params.url
        }
    });

    if(!proyecto){
        return next();
    }
    
    // render a la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}