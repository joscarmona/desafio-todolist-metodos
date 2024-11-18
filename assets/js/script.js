/* ********************************************************************** */
/* ********* Selección de los elementos web que se utiliza en JS ******** */
/* ********************************************************************** */
// INPUT (ingresar el nombre de la tarea)
const descripcionDeTareaInput = document.querySelector("#ingresarTareaInput")

// BUTTON (agregar la tarea a un arreglo)
const agregarTareaBtn = document.querySelector("#agregarTareaBtn")

const listaDeTareasTbody = document.querySelector("#tbodyListaDeTareas")

// SPAN (mostrar la cantidad total de tareas)
const cantidadDeTareas = document.querySelector("#tareasTotales")

// SPAN (mostrar la cantidad de tareas realizadas)
const tareasRealizadasSpan = document.querySelector("#tareasRealizadas")
/* ********************************************************************** */

/* ********************************************************************** */
/* ****************** Declaración de variables, arreglos **************** */
/* ********************************************************************** */
/* Arreglo de las tareas, inicialmente con datos */
// checkboxStatus se utiliza para registar el estado del checkbox lo que será útil para contabilizar las tareas realizadas (completadas)
const tareas = [
    {id: 1, descripcion: "Tarea 1", realizada: false, checkboxStatus: ""},
    {id: 2, descripcion: "Tarea 2", realizada: false, checkboxStatus: ""},
    {id: 3, descripcion: "Tarea 3", realizada: false, checkboxStatus: ""}
]

/* Arreglo vacío que se utilizará para ir guardando las tareas que se encuentran realizadas (completadas)*/
let tareasRealizadas = []
/* ********************************************************************** */

/* ********************************************************************** */
/* *********************** Declaración de funciones ********************* */
/* ********************************************************************** */
/* *** Función para actualizar la lista de tareas en el HTML *** */
function renderArray(array){
    // Variable que se utiliza para guardar la información a agregar en el HTML de forma estructurada
    let dynamicContentTareasTbody = ""

    //Iteración del arreglo de las tareas
    array.forEach((element) =>{
        // Se guarda el contenido cada objeto del arreglo tareas en la variable dynamicContentTareasTbody
        dynamicContentTareasTbody += `
            <tr>
                <td class="tdTarea" id="tdId">${element.id}</td>
                <td class="tdTarea" id="tareaRealizada-${element.id}">${element.descripcion}</td>
                <td class="tdTarea" style="text-align: center;">
                    <input type="checkbox" id="chequearTarea-${element.id}" onclick="
                        checkearTareaRealizada(${element.id})                                                
                    " ${element.checkboxStatus}>
                </td>
                <!-- OPCIÓN DE BORRAR TAREA -->
                <td class="tdTarea">
                    <button class="borrarTareaButton" onclick="borrar(${element.id})">Eliminar</button>
                </td>
            </tr>
        `
        console.log(element.id)
    })

    // Se actualiza la lista de tareas en el HTML
    listaDeTareasTbody.innerHTML = dynamicContentTareasTbody

    // Se actualizan los estados de las tareas que ha sido realizadas (completadas)
    // Mostrándose en el DOM la descripción de la tarea con un estilo cuando esta se encuentra realizada
    estiloDescripcionTarea()

    // Se actualiza la cantidad total de tareas
    cantidadDeTareas.innerHTML = `<b>Total:</b> ${tareas.length}`

    // Se actualiza la cantidad de tareas realizadas (completadas)
    tareasRealizadasSpan.innerHTML = `<b>Realizadas:</b> ${cantidadTareasRealizadas()}`

}

/* *** Función para borrar un elemento del arreglo a partir del id *** */
function borrar(id){
    // Obtengo el índice del elemento del arreglo que se desea eliminar a partir de el id del elemento
    const index = tareas.findIndex((element) => element.id === id)
    // console.log('holaaaaa ' + index + ', '  + id)
    
    // Se elimina el elemento correspondiente al índice determinado
    tareas.splice(index, 1)

    /* Actualizar la lista de tareas en el HTML */    
    renderArray(tareas)
    // console.table(tareas)
}

/* Función para chequear si una tarea ha sido realizada (completada) o no */
function checkearTareaRealizada(id){
    // Obtengo el índice del elemento del arreglo que se desea chequear el estado de la tarea, si se encuentra completada o no
    // console.log('#chequearTarea-' + id)
    // console.log(document.querySelector('#chequearTarea-' + id).checked)
    const index = tareas.findIndex((element) => element.id === id)
    // console.log(index)

    // Se consulta por el estado de la tarea, si se encuentra realizada o no
    if(document.querySelector('#chequearTarea-' + id).checked === true){
        // console.log('El índice es: ' + index)
        // Se asigna a la tarea correspondiente estado de realizada y se registra el estado de su checkbox
        tareas[index].realizada = true
        tareas[index].checkboxStatus = 'checked'
        // console.table(tareas[index])

        // Se da estilo a la descripción de la tarea correspondiente evidenciando que su estado es realizado
        // document.querySelector('#tareaRealizada-' + id).classList.add('styleTareaRealizada')
        document.querySelector('#tareaRealizada-' + id).classList.toggle('styleTareaRealizada')
        
        // Se actualiza la cantidad de tareas realizadas
        tareasRealizadasSpan.innerHTML = `<b>Realizadas:</b> ${cantidadTareasRealizadas()}`
    }else{
        // Se asigna a la tarea correspondiente estado de no realizada y se registra el estado de su checkbox
        // console.log('La tarea no se encuentra completada y el índice es: ' + index)
        tareas[index].realizada = false
        tareas[index].checkboxStatus = ""
        // console.table(tareas[index])

        // Se elimina el estilo a la descripción de la tarea correspondiente evidenciando que aún no se realiza la misma
        // document.querySelector('#tareaRealizada-' + id).classList.remove('styleTareaRealizada')
        document.querySelector('#tareaRealizada-' + id).classList.toggle('styleTareaRealizada')

        // Se actualiza la cantidad de tareas realizadas
        tareasRealizadasSpan.innerHTML = `<b>Realizadas:</b> ${cantidadTareasRealizadas()}`
    }
}

/* Función para contar la tareas que han sido realizadas (completadas) */
function cantidadTareasRealizadas(){
    // Se guarda en el arreglo tareasRealizadas[] la tareas que han sido completadas
    tareasRealizadas = tareas.filter((tarea) => tarea.realizada === true)
    // console.log('La cantidad de tareas realizadas es: ' + tareasRealizadas.length)

    // Retorna la cantidad de tareas que ya han sido realiazadas (completadas)
    return tareasRealizadas.length
}

/* Función que le da estilo a la descripción de la tarea cuando esta se encuentra realizada (completada) */
function estiloDescripcionTarea(){
    // Iteración del arreglo tareas
    tareas.forEach((element) =>{
        if(element.checkboxStatus === 'checked'){
            // Dando estilo ya que la tarea se encuentra realizada
            document.querySelector('#tareaRealizada-' + element.id).classList.add('styleTareaRealizada')
            // console.log('Chequeando si la tarea se ha realizado o no')
            // console.table(element)
        }else{
            // Elimiando estilo ya que la tarea aún no se realiza
            document.querySelector('#tareaRealizada-' + element.id).classList.remove('styleTareaRealizada')
        }
    })
}
/* ********************************************************************** */

/* ********************************************************************** */
/* * Mostrar lista de tareas */
/* ********************************************************************** */
// Se actualiza la cantidad total de tareas
// cantidadDeTareas.innerHTML = `<b>Total:</b> ${tareas.length}`

// Se actualiza la cantidad de tareas realizadas
// tareasRealizadasSpan.innerHTML = `<b>Realizadas:</b> ${tareasRealizadas.length}`

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
        alert("Por favor ingresar una nueva tarea")
    }

    /* Actualizar la lista de tareas en el HTML */
        // Dentro de la función renderArray(array) se encuentra la opción de borrar cada tarea
        renderArray(tareas)
        //console.table(tareas)
})