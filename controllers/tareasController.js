const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    // Obtenemos el Proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

    // leer el valor del input
    const { tarea } = req.body;

    // estado 0 = incompleto y ID de Proyecto
    const estado = 0;
    const ProyectoId = proyecto.id;

    // Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, ProyectoId });

    // Si no hay resultados
    if (!resultado) {
        return next();
    }

    // redireccionamos
    res.redirect(`/proyectos/${req.params.url}`);

}

exports.cambiarEstadoTarea = async (req, res) => {

    const { id } = req.params;

    //Buscamos la tarea 
    const tarea = await Tareas.findOne({ where: { id } });

    console.log(tarea);
    // cambiar el estado
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    // Si no hay resultado
    if (!resultado) return next();

    res.status(200).send('Tarea Actualizada');
}

exports.eliminarTarea = async (req, res) => {

    const { id } = req.params;
    //console.log(id);
    // delete tarea
    const resultado = await Tareas.destroy({ where: { id } });

    // Si no hay resultado
    if (!resultado) return next();

    res.status(200).send('Tarea Eliminada Correctamente');
}