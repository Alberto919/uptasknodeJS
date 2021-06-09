import axios from "axios";

const tareas = document.querySelector('.listado-pendientes');
console.log('tareas',tareas);
if(tareas) {

    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                 .then(function(respuesta){
                    if(respuesta.status === 200){
                        console.log(respuesta);
                        icono.classList.toggle('completo');
                    }
                 })
        }
    });

}

export default tareas;