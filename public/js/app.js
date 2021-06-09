import proyectos from './modulos/proyectos';
import tareas from './modulos/tareas';
import { actualizarAvance } from './modulos/funciones/avances';

document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})