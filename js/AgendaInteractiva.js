// Creo las constantes globales del archivo que me serviran para guardar la información que los usuarios vayan registrando.
const eventForm = document.getElementById('formulary'); //No se puede olvidar la etiqueta formulario porque de aquí sacamos el botón
const eventTittleEventInput = document.getElementById('InputTittleEvent');
const eventDateInput = document.getElementById('InputDate');
const eventHourInput = document.getElementById('InputHour');
const eventList = document.getElementById('eventList');

// Creo el manejo de envío de datos a traves del formulario
eventForm.addEventListener('submit', function(e){
    e.preventDefault(); //Evitar que la pagina se recargue al enviar el formularios

    //Obtener los valores de los elementos del formulario
    localStorage.Tittle = eventTittleEventInput.value;
    localStorage.Date = eventDateInput.value;
    localStorage.Hour = eventHourInput.value;

    //Validar que los campos no esten vacios
    if(localStorage.Tittle === '' || localStorage.Date === '' || localStorage.Hour === ''){
        alert('Por favor completa todos los campos!!!');
        return;
    }

    //Crear el elemento en la lista
    var li=document.createElement('li');
    li.innerHTML = `<span>${localStorage.Tittle} - ${localStorage.Date} - ${localStorage.Hour}</span><button class="delete-btn">Eliminar</button>`;
    //li.innerHTML = localStorage.Tittle + " --- " + localStorage.Date + " --- " + localStorage.Hour

    //Insertar el elemento en la lista
    eventList.appendChild(li);//ApendChild agrega un elemento al final de la lista, append es agregar Child es hijo. Un hijo del elemento que se encuentra antes del punto.

    //Limpiar los campos del formulario
    eventForm.reset();

});