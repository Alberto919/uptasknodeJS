import axios from "axios";
import Swal from 'sweetalert2';
import { actualizarAvance } from './funciones/avances';

// selecciona el listado de tareas pendientes
const tareas = document.querySelector('.listado-pendientes');
console.log('tareas', tareas);
if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        //console.log(respuesta);

                        icono.classList.toggle('completo');
                        //Actualiza el avance
                        actualizarAvance();
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {

            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;

            Swal.fire({
                title: 'Deseas borrar esta Tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                type: 'warning',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`;

                    // Eliminar tarea
                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            if (respuesta.status === 200) {
                                // console.log(respuesta);
                                // Eliminar el Nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                                //Actualiza el avance
                                actualizarAvance();
                            }
                        });
                }
            })

        }

    });

}

export default tareas;