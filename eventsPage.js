async function renderEventsPage(container) {
    container.innerHTML = `
        <div class="container">
            <h1 class="text-center mb-4">Eventos de Marvel</h1>
            
            <!-- Filtros con Button Groups -->
            <div class="row mb-4">
                <div class="col-md-8 mx-auto">
                    <div class="input-group">
                        <input type="text" id="event-name" class="form-control" placeholder="Buscar evento...">
                        <select id="year-filter" class="form-select">
                            ${generateYearOptions()}
                        </select>
                        <button id="apply-filters" class="btn bg-marvel-blue text-white">Buscar</button>
                    </div>
                    
                    <!-- Button Group para ordenamiento -->
                    <div class="btn-group w-100 mt-3" role="group" aria-label="Ordenar eventos">
                        <input type="radio" class="btn-check" name="sort-order" id="sort-newest" autocomplete="off" checked>
                        <label class="btn btn-outline-primary" for="sort-newest">Más recientes</label>
                        
                        <input type="radio" class="btn-check" name="sort-order" id="sort-oldest" autocomplete="off">
                        <label class="btn btn-outline-primary" for="sort-oldest">Más antiguos</label>
                        
                        <input type="radio" class="btn-check" name="sort-order" id="sort-name" autocomplete="off">
                        <label class="btn btn-outline-primary" for="sort-name">Por nombre</label>
                    </div>
                    
                    <!-- Button Group para filtros rápidos -->
                    <div class="btn-group w-100 mt-2" role="group" aria-label="Filtros rápidos">
                        <button type="button" class="btn btn-outline-secondary" data-filter="all">Todos</button>
                        <button type="button" class="btn btn-outline-secondary" data-filter="crossover">Crossovers</button>
                        <button type="button" class="btn btn-outline-secondary" data-filter="limited">Series Limitadas</button>
                        <button type="button" class="btn btn-outline-secondary" data-filter="ongoing">Series Regulares</button>
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

    // Añadir event listeners para los nuevos botones
    document.querySelectorAll('.btn-check').forEach(radio => {
        radio.addEventListener('change', loadEvents);
    });

    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            loadEvents();
        });
    });

    // Event listeners existentes
    document.getElementById('apply-filters').addEventListener('click', loadEvents);
    document.getElementById('event-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loadEvents();
    });
    document.getElementById('year-filter').addEventListener('change', loadEvents);
    await loadEvents();
}

async function loadEvents() {
    const eventList = document.getElementById('event-list');
    // Reemplazar el texto de carga con un spinner
    eventList.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando eventos...</p>
        </div>
    `;

    const eventName = document.getElementById('event-name').value;
    const yearFilter = document.getElementById('year-filter').value;
    const sortOrder = document.querySelector('input[name="sort-order"]:checked').id;
    const activeFilter = document.querySelector('[data-filter].active')?.dataset.filter || 'all';

    try {
        let params = { limit: 25 };
        if (eventName) {
            params.nameStartsWith = eventName.slice(0, 3);
        }

        const events = await getEvents(params);

        if (events && events.results && events.results.length > 0) {
            let filteredEvents = events.results.filter(event => {
                if (!event.start) return false;
                
                const eventYear = new Date(event.start).getFullYear();
                const matchesYear = !yearFilter || eventYear.toString() === yearFilter;
                
                if (activeFilter === 'all') return matchesYear;
                return matchesYear && event.type?.toLowerCase().includes(activeFilter.toLowerCase());
            });

            filteredEvents.sort((a, b) => {
                switch(sortOrder) {
                    case 'sort-oldest':
                        return new Date(a.start) - new Date(b.start);
                    case 'sort-name':
                        return a.title.localeCompare(b.title);
                    default: // sort-newest
                        return new Date(b.start) - new Date(a.start);
                }
            });

            eventList.innerHTML = '';
            if (filteredEvents.length > 0) {
                filteredEvents.forEach(event => {
                    const eventDate = new Date(event.start);
                    const eventCard = createElement('div', { class: 'col' }, `
                        <div class="card h-100 shadow-sm">
                            <div class="ratio ratio-1x1">
                                <img src="${event.thumbnail.path}/standard_large.${event.thumbnail.extension}" 
                                     class="card-img-top object-fit-cover" alt="${event.title}"
                                     onerror="this.src='https://via.placeholder.com/400x400.png?text=Imagen+no+disponible'">
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
                eventList.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-info">
                            No se encontraron eventos con los filtros seleccionados.
                        </div>
                    </div>`;
            }
        } else {
            eventList.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning">
                        No se encontraron eventos.
                    </div>
                </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        eventList.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar los eventos. Por favor, intenta nuevamente.
                </div>
            </div>`;
    }
}

function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    let options = '<option value="">Todos los años</option>';
    for (let year = currentYear; year >= 1939; year--) {
        options += `<option value="${year}">${year}</option>`;
    }
    return options;
}

async function showEventDetails(event) {
    const detailsContainer = document.getElementById('event-details');
    const modalContent = detailsContainer.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title h4">${event.title}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <img src="${event.thumbnail.path}/landscape_incredible.${event.thumbnail.extension}" 
                 alt="${event.title}" class="img-fluid rounded mb-3">
            
            <div class="accordion" id="eventAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseDescription">
                            Descripción
                        </button>
                    </h2>
                    <div id="collapseDescription" class="accordion-collapse collapse show" 
                         data-bs-parent="#eventAccordion">
                        <div class="accordion-body">
                            ${event.description || 'No hay descripción disponible.'}
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseComics">
                            Cómics Relacionados (${event.comics.items.length})
                        </button>
                    </h2>
                    <div id="collapseComics" class="accordion-collapse collapse" 
                         data-bs-parent="#eventAccordion">
                        <div class="accordion-body">
                            <ul class="list-group list-group-flush">
                                ${event.comics.items.map(comic => `
                                    <li class="list-group-item">${comic.name}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseCharacters">
                            Personajes (${event.characters.items.length})
                        </button>
                    </h2>
                    <div id="collapseCharacters" class="accordion-collapse collapse" 
                         data-bs-parent="#eventAccordion">
                        <div class="accordion-body">
                            <ul class="list-group list-group-flush">
                                ${event.characters.items.map(character => `
                                    <li class="list-group-item">${character.name}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseDates">
                            Fechas
                        </button>
                    </h2>
                    <div id="collapseDates" class="accordion-collapse collapse" 
                         data-bs-parent="#eventAccordion">
                        <div class="accordion-body">
                            <p>Inicio: ${event.start ? new Date(event.start).toLocaleDateString() : 'No disponible'}</p>
                            <p>Fin: ${event.end ? new Date(event.end).toLocaleDateString() : 'No disponible'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(detailsContainer);
    modal.show();
}