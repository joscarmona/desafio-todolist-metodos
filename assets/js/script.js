/* Selección de los elementos web que se utiliza en JS */
// INPUT (ingresar el nombre de la tarea)
const nombreDeTareaInput = document.querySelector("#ingresarTareaInput")

// BUTTON (agregar la tarea a un arreglo)
const agregarTareaBtn = document.querySelector("#agregarTareaBtn")

// UL (mostrar la lista de tareas)
const listaDeTareasUl = document.querySelector("#listaDeTareas")

// SPAN (mostrar la cantidad total de tareas)
const cantidadDeTareas = document.querySelector("#totalTareas")

// SPAN (mostrar la cantidad de tareas realizadas)
const tareasRealizadasSpan = document.querySelector("#tareasRealizadas")

/* Arreglo vacío que se utilizará para ir guardando las tareas */
const tareas = []

/* Arreglo vacío que se utilizará para ir guardando las tareas */
const tareasRealizadas = []

// Se actualiza la cantidad total de tareas
cantidadDeTareas.innerHTML = `Total: ${tareas.length}`

// Se actualiza la cantidad de tareas realizadas
tareasRealizadasSpan.innerHTML = `Realizadas: ${tareasRealizadas.length}`

/* *** Función para actualizar la lista de tareas en el HTML *** */
function renderTareas(){
    // Variable que se utiliza para guardar la información a agregar en el HTML de forma estructurada
    let dynamicContentTareasUl = ""
    for(let tarea of tareas){
        dynamicContentTareasUl += `
            <li>
                ${tarea.nombre}
                <button onclick="borrar(${tarea.id})">Eliminar</button>
            </li>
        `
    }
    // Se actualiza la lista de tareas en el HTML
    listaDeTareasUl.innerHTML = dynamicContentTareasUl

    // Se actualiza la cantidad de tareas
    cantidadDeTareas.innerHTML = `Total: ${tareas.length}`
}

/* Evento del botón, al ser presionado se guardará en el arreglo tareas[] la tarea ingresada a través del input y posteriormente se actualizará la lista de tareas en el HTML */
agregarTareaBtn.addEventListener("click", () =>{
    /* Agregar la tarea ingresada al arreglo */
    // Se guarda en una variable el valor ingresado
    const nombreTarea = nombreDeTareaInput.value
    // Se agrega el nombre de la tarea ingresada en el arreglo de tareas
    tareas.push({id: Date.now(), nombre: nombreTarea})
    // Se limpia el input
    nombreDeTareaInput.value = ""

    /* Actualizar la lista de tareas en el HTML */
    renderTareas()
    console.table(tareas)
})

/* *** Función para borrar un elemento del arreglo a partir del id *** */
function borrar(id){
    // Obtengo el índice del elemento del arreglo que se desea eliminar a partir de el id del elemento
    const index = tareas.findIndex((element) => element.id === id)
    tareas.splice(index, 1)
    /* Actualizar la lista de tareas en el HTML */
    renderTareas()
    console.table(tareas)
}