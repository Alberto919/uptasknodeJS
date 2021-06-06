exports.proyectosHome = (req, res)=>{
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyectos = (req, res)=>{
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = (req, res)=>{
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
            errores
        })
    }
}