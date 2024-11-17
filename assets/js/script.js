/* ********************************************************************** */
/* ********* Selección de los elementos web que se utiliza en JS ******** */
/* ********************************************************************** */
// INPUT (ingresar el nombre de la tarea)
const descripcionDeTareaInput = document.querySelector("#ingresarTareaInput")

// BUTTON (agregar la tarea a un arreglo)
const agregarTareaBtn = document.querySelector("#agregarTareaBtn")

// UL (mostrar la lista de tareas)
// const listaDeTareasUl = document.querySelector("#listaDeTareas")
// TBODY (mostrar lista de tareas)
const listaDeTareasTbody = document.querySelector("#tbodyListaDeTareas")

// SPAN (mostrar la cantidad total de tareas)
const cantidadDeTareas = document.querySelector("#totalTareas")

// SPAN (mostrar la cantidad de tareas realizadas)
const tareasRealizadasSpan = document.querySelector("#tareasRealizadas")
/* ********************************************************************** */

/* ********************************************************************** */
/* ****************** Declaración de variables, arreglos **************** */
/* ********************************************************************** */
/* Arreglo vacío que se utilizará para ir guardando las tareas */
const tareas = [
    {id: 1, descripcion: "Tarea 1", realizada: false, check: ""},
    {id: 2, descripcion: "Tarea 2", realizada: false, check: ""},
    {id: 3, descripcion: "Tarea 3", realizada: false, check: ""}
]

/* Arreglo vacío que se utilizará para ir guardando las tareas */
let tareasRealizadas = []
/* ********************************************************************** */

/* ********************************************************************** */
/* *********************** Declaración de funciones ********************* */
/* ********************************************************************** */
/* *** Función para actualizar la lista de tareas en el HTML *** */
function renderArray(array){
    // Variable que se utiliza para guardar la información a agregar en el HTML de forma estructurada
    let dynamicContentTareasTbody = ""
    array.forEach((element) =>{
        // Se guarda el contenido cada objeto del arreglo tareas en la variable dynamicContentTareasTbody
        dynamicContentTareasTbody += `
            <tr>
                <td class="tdTarea" id="tdId">${element.id}</td>
                <td class="tdTarea" id="tareaRealizada-${element.id}">${element.descripcion}</td>
                <td class="tdTarea" style="text-align: center;">
                    <input type="checkbox" id="chequearTarea-${element.id}" onclick="
                        checkearTareaRealizada(${element.id})
                        document.querySelector('#tareaRealizada-${element.id}').classList.toggle('myStyle')
                    " ${element.check}>
                </td>
                <!-- OPCIÓN DE BORRAR TAREA -->
                <td class="tdTarea">
                    <button class="borrarTareaButton" onclick="borrar(${element.id})">Eliminar</button>
                </td>
            </tr>
        `
    })
    // Se actualiza la lista de tareas en el HTML
    listaDeTareasTbody.innerHTML = dynamicContentTareasTbody

    // Se actualiza la cantidad total de tareas
    cantidadDeTareas.innerHTML = `Total: ${tareas.length}`

    // Se actualiza la cantidad de tareas realizadas
    tareasRealizadasSpan.innerHTML = `Realizadas: ${cantidadTareasRealizadas()}`
}

/* *** Función para borrar un elemento del arreglo a partir del id *** */
function borrar(id){
    // Obtengo el índice del elemento del arreglo que se desea eliminar a partir de el id del elemento
    const index = tareas.findIndex((element) => element.id === id)
    console.log(index)
    tareas.splice(index, 1)
    /* Actualizar la lista de tareas en el HTML */
    renderArray(tareas)
    console.table(tareas)
}

/* Función para chequear si una tarea ha sido realizada (completada) o no */
function checkearTareaRealizada(id){
    //Obtengo el índice del elemento del arreglo que se desea chequear estado de la tarea, si se encuentra completada o no
    console.log('#chequearTarea-' + id)
    console.log(document.querySelector('#chequearTarea-' + id).checked)
    const index = tareas.findIndex((element) => element.id === id)
    // console.log(index)
    if(document.querySelector('#chequearTarea-' + id).checked == true){
        console.log('El índice es: ' + index)
        tareas[index].realizada = true
        tareas[index].check = 'checked'
        console.table(tareas[index])
        
        // Se actualiza la cantidad de tareas realizadas
        tareasRealizadasSpan.innerHTML = `Realizadas: ${cantidadTareasRealizadas()}`
    }else{
        console.log('La tarea no se encuentra completada y el índice es: ' + index)
        tareas[index].realizada = false
        tareas[index].check = ""
        console.table(tareas[index])

        // Se actualiza la cantidad de tareas realizadas
        tareasRealizadasSpan.innerHTML = `Realizadas: ${cantidadTareasRealizadas()}`
    }
}

/* Función para contar la tareas que han sido realizadas (completadas) */
function cantidadTareasRealizadas(){
    // Se guarda en el arreglo tareasRealizadas[] la tareas que han sido completadas
    tareasRealizadas = tareas.filter((tarea) => tarea.realizada === true)
    console.log('La cantidad de tareas realizadas es: ' + tareasRealizadas.length)
    return tareasRealizadas.length
}





/* ********************************************************************** */

/* ********************************************************************** */
/* * Actualización del total de tareas y de las realizadas, mostrar lista */
/* ********************************************************************** */
// Se actualiza la cantidad total de tareas
cantidadDeTareas.innerHTML = `Total: ${tareas.length}`

// Se actualiza la cantidad de tareas realizadas
tareasRealizadasSpan.innerHTML = `Realizadas: ${tareasRealizadas.length}`

// Se actualiza la lista de tareas en HTML
renderArray(tareas)

/* ********************************************************************** */
/* ********************** Agregar Tarea a la lista ********************** */
/* ********************************************************************** */
/* Evento del botón, al ser presionado se guardará en el arreglo tareas[] la tarea ingresada a través del input y posteriormente se actualizará la lista de tareas en el HTML */
agregarTareaBtn.addEventListener("click", () =>{
    /* Agregar la tarea ingresada al arreglo */
    // Se guarda en una variable el valor ingresado
    const descripcionTarea = descripcionDeTareaInput.value

    // Se chequea si se ha ingresado algún valor en el INPUT
    if(descripcionTarea != ""){
        // Se agrega el nombre de la tarea ingresada en el arreglo de tareas
        tareas.push({id: Date.now(), descripcion: descripcionTarea, realizada: false})
        // Se limpia el input
        descripcionDeTareaInput.value = ""
    }else{
        alert("Por favor ingrese la nueva tarea")
    }

    /* Actualizar la lista de tareas en el HTML */
        // Dentro de la función renderArray(array) se encuentra la opción de borrar cada tarea
        renderArray(tareas)
        //console.table(tareas)
})