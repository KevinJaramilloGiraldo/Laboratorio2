const eventForm = document.getElementById('formulary');
const eventTittleEventInput = document.getElementById('InputTittleEvent');
const eventDateInput = document.getElementById('InputDate');
const eventHourInput = document.getElementById('InputHour');
const eventList = document.getElementById('eventList');
const filterDateButton = document.getElementById('filterDateButton');
const filterDateInput = document.getElementById('filterDateInput');

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
        addEventToDOM(event, index);
    });
}

// Función para agregar un evento al DOM
function addEventToDOM(event, index) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${event.titulo} - ${event.fecha} - ${event.hora}</span>
        <button class="boton-borrar" data-index="${index}">Eliminar</button>`;
    eventList.appendChild(li);  
}

// Función para eliminar un evento del localStorage
function deleteEventFromLocalStorage(index) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents(); // Recargar eventos
}

// Delegación de eventos para manejar los botones "Borrar"
eventList.addEventListener('click', function(e) {
    if (e.target.classList.contains('boton-borrar')) {
        const index = e.target.getAttribute('data-index');
        deleteEventFromLocalStorage(index);
        e.target.parentElement.remove(); // Eliminar del DOM
    }
});

// Manejo del envío de datos a través del formulario
eventForm.addEventListener('submit', function(e) {
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
    addEventToDOM(evento, JSON.parse(localStorage.getItem('events')).length - 1);
    eventForm.reset();
});

// Función para filtrar eventos por fecha
function filterEventsByDate() {
    const selectedDate = filterDateInput.value;
    const events = JSON.parse(localStorage.getItem('events')) || [];

    // Limpiar la lista actual de eventos
    eventList.innerHTML = '';

    // Filtrar y mostrar solo los eventos de la fecha seleccionada
    const filteredEvents = events.filter(event => event.fecha === selectedDate);

    if (filteredEvents.length > 0) {
        filteredEvents.forEach((event, index) => {
            addEventToDOM(event, index);
        });
    } else {
        eventList.innerHTML = '<li>No hay eventos para esta fecha</li>';
    }
    
}

// Asignar el evento click al botón para filtrar por fecha
filterDateButton.addEventListener('click', filterEventsByDate);

// Cargar los eventos guardados cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadEvents);

// Obtener las referencias al botón y al audio
const button = document.getElementById('floatbutton');
const song = document.getElementById('song');

// Función para alternar entre reproducir y pausar
function PlayOPause() {
    if (song.paused) {
        song.play();
        button.textContent = 'Pause Music';
    } else {
        song.pause();
        button.textContent = 'Play Music';
    }
}

// Asignar el evento de clic al botón de música
button.addEventListener('click', PlayOPause);

// Creación de la función para esperar a que todo el contenido JavaScript esté cargado porque al
// Función para esperar a que todo el contenido JavaScript esté cargado
window.addEventListener('load', function () {
    document.body.style.visibility = 'visible';
});