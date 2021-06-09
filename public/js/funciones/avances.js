import Swal from 'sweetalert2';

export const actualizarAvance = () => {
    // selecciona las tareas existentes
    const tareas = document.querySelectorAll('li.tarea');

    if (tareas.length) {
        // selecciona las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');
        console.log('tareasCompletas',tareasCompletas.length);
        console.log('tareas',tareas.length);
        // calcula el avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

        // muestra el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        if (avance === 100) {
            Swal.fire(
                'Completaste el Proyecto',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }
}