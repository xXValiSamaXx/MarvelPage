async function renderEventsPage(container) {
    container.innerHTML = `
        <div class="container">
            <h1 class="text-center mb-4">Eventos de Marvel</h1>
            <div class="row mb-4">
                <div class="col-md-8 mx-auto">
                    <div class="input-group">
                        <input type="text" id="event-name" class="form-control" placeholder="Buscar evento...">
                        <select id="year-filter" class="form-select">
                            ${generateYearOptions()}
                        </select>
                        <button id="apply-filters" class="btn bg-marvel-blue text-white">Buscar</button>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="event-list"></div>
            <div class="modal fade" id="event-details" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('apply-filters').addEventListener('click', loadEvents);
    document.getElementById('event-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadEvents();
        }
    });
    document.getElementById('year-filter').addEventListener('change', loadEvents);
    await loadEvents();
}

function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    let options = '<option value="">Todos los años</option>';
    for (let year = currentYear; year >= 1939; year--) {
        options += `<option value="${year}">${year}</option>`;
    }
    return options;
}

async function loadEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '<div class="col-12 text-center"><p>Cargando eventos...</p></div>';

    const eventName = document.getElementById('event-name').value;
    const yearFilter = document.getElementById('year-filter').value;

    let params = { limit: 25 };
    if (eventName) {
        params.nameStartsWith = eventName.slice(0, 3);
    }

    const events = await getEvents(params);

    if (events && events.results) {
        eventList.innerHTML = '';
        
        let filteredEvents = events.results
            .filter(event => {
                if (!event.start) return false;
                const eventYear = new Date(event.start).getFullYear();
                return !yearFilter || eventYear.toString() === yearFilter;
            })
            .sort((a, b) => {
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);
                return dateB - dateA;
            });

        if (filteredEvents.length > 0) {
            filteredEvents.forEach(event => {
                const eventDate = new Date(event.start);
                const eventCard = createElement('div', { class: 'col' }, `
                    <div class="card h-100 shadow-sm">
                        <div class="ratio ratio-1x1">
                            <img src="${event.thumbnail.path}/standard_large.${event.thumbnail.extension}" 
                                 class="card-img-top object-fit-cover" alt="${event.title}">
                        </div>
                        <div class="card-body text-center">
                            <h3 class="card-title h5 text-marvel-red">${event.title}</h3>
                            <p class="card-text small">${eventDate.getFullYear()}</p>
                        </div>
                    </div>
                `);
                eventCard.addEventListener('click', () => showEventDetails(event));
                eventList.appendChild(eventCard);
            });
        } else {
            eventList.innerHTML = '<div class="col-12 text-center"><p>No se encontraron eventos para el año seleccionado.</p></div>';
        }
    } else {
        eventList.innerHTML = '<div class="col-12 text-center"><p>No se pudieron cargar los eventos.</p></div>';
    }
}

async function showEventDetails(event) {
    const detailsContainer = document.getElementById('event-details');
    const modalContent = detailsContainer.querySelector('.modal-content');
    modalContent.innerHTML = '<div class="modal-body text-center"><p>Cargando detalles del evento...</p></div>';
    
    const modal = new bootstrap.Modal(detailsContainer);
    modal.show();

    const eventDetails = await fetchMarvelAPI(`events/${event.id}`);

    if (eventDetails && eventDetails.results && eventDetails.results[0]) {
        const fullEvent = eventDetails.results[0];
        const startDate = fullEvent.start ? new Date(fullEvent.start) : null;
        const endDate = fullEvent.end ? new Date(fullEvent.end) : null;

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title h4">${fullEvent.title}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="text-center mb-3">
                    <img src="${fullEvent.thumbnail.path}/landscape_incredible.${fullEvent.thumbnail.extension}" 
                         alt="${fullEvent.title}" class="img-fluid rounded">
                </div>
                <p class="mb-3">${fullEvent.description || 'No hay descripción disponible.'}</p>
                ${startDate ? `<p class="mb-2">Fecha de inicio: ${startDate.toLocaleDateString()}</p>` : ''}
                ${endDate ? `<p class="mb-4">Fecha de finalización: ${endDate.toLocaleDateString()}</p>` : ''}
                
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <h3 class="h5 mb-3">Cómics relacionados:</h3>
                        <ul class="list-unstyled">
                            ${fullEvent.comics.items.slice(0, 5).map(comic => `<li class="mb-1">${comic.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-md-6 mb-4">
                        <h3 class="h5 mb-3">Personajes importantes:</h3>
                        <ul class="list-unstyled">
                            ${fullEvent.characters.items.slice(0, 5).map(character => `<li class="mb-1">${character.name}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        modalContent.innerHTML = '<div class="modal-body text-center"><p>No se pudieron cargar los detalles del evento.</p></div>';
    }
}