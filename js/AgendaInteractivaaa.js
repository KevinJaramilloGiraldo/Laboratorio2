// Creo las constantes globales del archivo que me servirán para guardar la información que los usuarios vayan registrando.
const eventForm = document.getElementById('formulary');
const eventTittleEventInput = document.getElementById('InputTittleEvent');
const eventDateInput = document.getElementById('InputDate');
const eventHourInput = document.getElementById('InputHour');
const eventList = document.getElementById('eventList');

// Función para guardar en localStorage
function saveEventToLocalStorage(event) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Función para cargar los eventos desde localStorage y mostrarlos
function loadEvents() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach((event, index) => {
        var li = document.createElement('li');
        li.innerHTML = `
            <span>${event.titulo} - ${event.fecha} - ${event.hora}</span>
            <button class="boton-borrar" data-index="${index}">Borrar</button>
        `;
        eventList.appendChild(li);
    });
}

// Función para eliminar un evento del localStorage
function deleteEventFromLocalStorage(index) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); // Eliminar el evento del array
    localStorage.setItem('events', JSON.stringify(events)); // Actualizar el localStorage
}

// Creación del evento de carga de la página o del invocador de la función loadEvents
document.addEventListener('DOMContentLoaded', loadEvents);

// Creación del manejo del envío de datos a través del formulario
eventForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let title = eventTittleEventInput.value;
    let date = eventDateInput.value;
    let hour = eventHourInput.value;

    if (title === '' || date === '' || hour === '') {
        alert('Por favor completa todos los campos!!!');
        return;
    }

    let evento = {
        titulo: title,
        fecha: date,
        hora: hour
    };

    saveEventToLocalStorage(evento);

    var li = document.createElement('li');
    li.innerHTML = `
        <span>${evento.titulo} - ${evento.fecha} - ${evento.hora}</span>
        <button class="boton-borrar" data-index="${document.querySelectorAll('li').length}">Borrar</button>
    `;

    eventList.appendChild(li);
    eventForm.reset();
});

// Delegación de eventos para manejar los botones "Borrar"
eventList.addEventListener('click', function (e) {
    if (e.target.classList.contains('boton-borrar')) {
        const index = e.target.getAttribute('data-index');
        deleteEventFromLocalStorage(index); // Eliminar del localStorage
        e.target.parentElement.remove(); // Eliminar del DOM
    }
});

// Obtener las referencias al botón y al audio
const button = document.getElementById('floatbutton');
const song = document.getElementById('song');

// Función para alternar entre reproducir y pausar
function PlayOPause() {
    if (song.paused) {  // Si la canción está pausada
        song.play();     // Reproduce la canción
        button.textContent = 'Pause Music'; // Cambiar el texto del botón
    } else {
        song.pause();    // Pausa la canción
        button.textContent = 'Play Music';  // Cambiar el texto del botón
    }
}

// Asignar el evento de clic al botón
button.addEventListener('click', PlayOPause);

// Creación de la función para esperar a que todo el contenido JavaScript esté cargado porque al
// Función para esperar a que todo el contenido JavaScript esté cargado
window.addEventListener('load', function () {
    document.body.style.visibility = 'visible';
});