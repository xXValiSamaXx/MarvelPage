async function getCharacterComics(characterId) {
    const response = await fetchMarvelAPI(`characters/${characterId}/comics`, { limit: 10 });
    return response?.results || [];
}

async function getCharacterSeries(characterId) {
    const response = await fetchMarvelAPI(`characters/${characterId}/series`, { limit: 10 });
    return response?.results || [];
}

async function renderCharactersPage(container) {
    container.innerHTML = `
        <div class="container">
            <h1 class="text-center mb-4">Personajes de Marvel</h1>

             <!-- Flex Stats Banner -->
            <div class="d-flex flex-wrap justify-content-around align-items-center bg-body p-3 rounded mb-4 border">
                <div class="d-flex align-items-center p-2">
                    <i class="bi bi-person-fill text-primary me-2 fs-4"></i>
                    <div>
                        <h6 class="mb-0">Personajes</h6>
                        <span class="fs-5 fw-bold" id="total-characters">0</span>
                    </div>
                </div>
                <div class="d-flex align-items-center p-2">
                    <i class="bi bi-book-fill text-danger me-2 fs-4"></i>
                    <div>
                        <h6 class="mb-0">Cómics</h6>
                        <span class="fs-5 fw-bold" id="total-comics">0</span>
                    </div>
                </div>
                <div class="d-flex align-items-center p-2">
                    <i class="bi bi-collection-fill text-success me-2 fs-4"></i>
                    <div>
                        <h6 class="mb-0">Series</h6>
                        <span class="fs-5 fw-bold" id="total-series">0</span>
                    </div>
                </div>
                <div class="d-flex align-items-center p-2">
                    <i class="bi bi-star-fill text-warning me-2 fs-4"></i>
                    <div>
                        <h6 class="mb-0">Eventos</h6>
                        <span class="fs-5 fw-bold" id="total-events">0</span>
                    </div>
                </div>
            </div>

            <!-- Botón para mostrar Offcanvas en móvil -->
            <button class="btn bg-marvel-blue text-white d-md-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterOffcanvas">
                <i class="bi bi-funnel"></i> Mostrar Filtros
            </button>

            <div class="row mb-4">
                <div class="col-md-8 mx-auto">
                    <div class="input-group">
                        <input type="text" id="character-name" class="form-control" placeholder="Buscar personaje...">
                        <button class="btn btn-outline-secondary dropdown-toggle d-none d-md-block" type="button" 
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Filtros
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><h6 class="dropdown-header">Ordenar por</h6></li>
                            <li><button class="dropdown-item" type="button" data-sort="name">Nombre</button></li>
                            <li><button class="dropdown-item" type="button" data-sort="modified">Última modificación</button></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><h6 class="dropdown-header">Mostrar solo</h6></li>
                            <li>
                                <button class="dropdown-item" type="button" data-filter="comics">
                                    Con cómics <span class="badge bg-primary rounded-pill ms-2"></span>
                                </button>
                            </li>
                            <li>
                                <button class="dropdown-item" type="button" data-filter="series">
                                    Con series <span class="badge bg-primary rounded-pill ms-2"></span>
                                </button>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <div class="px-3 py-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="availableComics">
                                        <label class="form-check-label" for="availableComics">
                                            Disponible en cómics
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button id="apply-filters" class="btn bg-marvel-blue text-white">Buscar</button>
                    </div>
                </div>
            </div>

            <!-- Offcanvas para filtros en móvil -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="filterOffcanvas">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Filtros de búsqueda</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="mb-4">
                        <h6>Ordenar por</h6>
                        <div class="list-group">
                            <button class="list-group-item list-group-item-action" data-sort="name">Nombre</button>
                            <button class="list-group-item list-group-item-action" data-sort="modified">Última modificación</button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h6>Mostrar solo</h6>
                        <div class="list-group">
                            <button class="list-group-item list-group-item-action" data-filter="comics">
                                Con cómics
                            </button>
                            <button class="list-group-item list-group-item-action" data-filter="series">
                                Con series
                            </button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="availableComics-mobile">
                            <label class="form-check-label" for="availableComics-mobile">
                                Disponible en cómics
                            </label>
                        </div>
                    </div>

                    <button class="btn bg-marvel-blue text-white w-100" data-bs-dismiss="offcanvas" 
                            onclick="searchCharacters()">
                        Aplicar filtros
                    </button>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="character-results">
                <div class="col-12 text-center">
                    <p class="text-muted">Usa el buscador para encontrar personajes</p>
                </div>
            </div>

            <div class="modal fade" id="character-details" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content"></div>
                </div>
            </div>
        </div>
    `;

    // Event listeners para filtros y búsqueda
    document.querySelectorAll('[data-sort], [data-filter]').forEach(item => {
        item.addEventListener('click', (e) => {
            const type = e.target.hasAttribute('data-sort') ? 'sort' : 'filter';
            const value = e.target.dataset[type];
            
            document.querySelectorAll(`[data-${type}]`).forEach(el => {
                el.classList.remove('active');
            });
            
            e.target.classList.add('active');
            
            const mobileElement = document.querySelector(`#filterOffcanvas [data-${type}="${value}"]`);
            const desktopElement = document.querySelector(`.dropdown-menu [data-${type}="${value}"]`);
            
            if (mobileElement) mobileElement.classList.add('active');
            if (desktopElement) desktopElement.classList.add('active');
            
            searchCharacters();
        });
    });

    // Sincronizar checkboxes
    document.getElementById('availableComics').addEventListener('change', (e) => {
        document.getElementById('availableComics-mobile').checked = e.target.checked;
        searchCharacters();
    });

    document.getElementById('availableComics-mobile').addEventListener('change', (e) => {
        document.getElementById('availableComics').checked = e.target.checked;
        searchCharacters();
    });

    document.getElementById('apply-filters').addEventListener('click', searchCharacters);
    document.getElementById('character-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCharacters();
        }
    });
}

function updateStatsFromResults(characters) {
    const stats = characters.reduce((acc, char) => {
        acc.comics += char.comics.available;
        acc.series += char.series.available;
        acc.events += char.events.available;
        return acc;
    }, { comics: 0, series: 0, events: 0 });

    document.getElementById('total-characters').textContent = characters.length.toLocaleString();
    document.getElementById('total-comics').textContent = stats.comics.toLocaleString();
    document.getElementById('total-series').textContent = stats.series.toLocaleString();
    document.getElementById('total-events').textContent = stats.events.toLocaleString();
}

async function searchCharacters() {
    const characterResults = document.getElementById('character-results');
    characterResults.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Buscando personajes...</p>
        </div>
    `;

    const characterName = document.getElementById('character-name').value;
    if (!characterName.trim()) {
        characterResults.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    Ingresa el nombre de un personaje para buscar
                </div>
            </div>`;
        updateStatsFromResults([]);
        return;
    }

    const searchTerm = characterName.slice(0, 3);
    const sortType = document.querySelector('[data-sort].active')?.dataset.sort;
    const filterType = document.querySelector('[data-filter].active')?.dataset.filter;
    const availableComics = document.getElementById('availableComics').checked;

    try {
        const characters = await getCharacters({ 
            nameStartsWith: searchTerm,
            limit: 100
        });

        if (characters?.results?.length > 0) {
            let filteredResults = characters.results;

            if (filterType === 'comics') {
                filteredResults = filteredResults.filter(char => char.comics.available > 0);
            } else if (filterType === 'series') {
                filteredResults = filteredResults.filter(char => char.series.available > 0);
            }

            if (availableComics) {
                filteredResults = filteredResults.filter(char => char.comics.available > 0);
            }

            if (sortType) {
                filteredResults.sort((a, b) => {
                    if (sortType === 'name') {
                        return a.name.localeCompare(b.name);
                    } else if (sortType === 'modified') {
                        return new Date(b.modified) - new Date(a.modified);
                    }
                    return 0;
                });
            }

            // Actualizar estadísticas con los resultados filtrados
            updateStatsFromResults(filteredResults);

            characterResults.innerHTML = '';
            filteredResults.slice(0, 20).forEach(character => {
                const card = createElement('div', { class: 'col' }, `
                    <div class="card h-100 shadow-sm">
                        <img src="${character.thumbnail.path}/standard_large.${character.thumbnail.extension}" 
                             class="card-img-top" alt="${character.name}" style="cursor: pointer;">
                        <div class="card-body text-center">
                            <h3 class="card-title h5">
                                <button type="button" class="btn btn-link text-marvel-red p-0 border-0" 
                                        data-bs-toggle="popover" 
                                        data-bs-trigger="hover focus" 
                                        data-bs-title="${character.name}" 
                                        data-bs-content="${character.description || 'Sin descripción disponible'}"
                                        data-bs-html="true">
                                    ${character.name}
                                </button>
                            </h3>
                            <div class="mt-2">
                                <button type="button" class="btn btn-sm btn-outline-primary" 
                                        data-bs-toggle="popover" 
                                        data-bs-trigger="hover focus" 
                                        data-bs-title="Apariciones" 
                                        data-bs-html="true" 
                                        data-bs-content="
                                            <div>Cómics: ${character.comics.available}</div>
                                            <div>Series: ${character.series.available}</div>
                                            <div>Eventos: ${character.events.available}</div>
                                        ">
                                    Ver estadísticas
                                </button>
                            </div>
                        </div>
                    </div>
                `);

                const cardElement = card.querySelector('.card');
                cardElement.addEventListener('click', () => showCharacterDetails(character));
                
                characterResults.appendChild(card);

                const popovers = card.querySelectorAll('[data-bs-toggle="popover"]');
                popovers.forEach(popoverEl => {
                    new bootstrap.Popover(popoverEl, {
                        sanitize: false
                    });
                });
            });
        } else {
            characterResults.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        No se encontraron personajes con ese nombre.
                    </div>
                </div>`;
            updateStatsFromResults([]);
        }
    } catch (error) {
        console.error('Error:', error);
        characterResults.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al buscar personajes. Por favor, intenta nuevamente.
                </div>
            </div>`;
        updateStatsFromResults([]);
    }
}

async function showCharacterDetails(character) {
    const detailsContainer = document.getElementById('character-details');
    const modalContent = detailsContainer.querySelector('.modal-content');

    // Mostrar spinner mientras carga
    modalContent.innerHTML = `
        <div class="modal-body text-center p-5">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3">Cargando detalles del personaje...</p>
        </div>
    `;

    const modal = new bootstrap.Modal(detailsContainer);
    modal.show();

    try {
        const [comics, series] = await Promise.all([
            getCharacterComics(character.id),
            getCharacterSeries(character.id)
        ]);

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title h4">${character.name}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <nav id="character-nav" class="navbar navbar-light sticky-top" style="top: 20px;">
                            <nav class="nav nav-pills flex-column">
                                <button class="nav-link active" data-bs-target="#description">Descripción</button>
                                <button class="nav-link" data-bs-target="#comics">Cómics</button>
                                <button class="nav-link" data-bs-target="#series">Series</button>
                                <button class="nav-link" data-bs-target="#stats">Estadísticas</button>
                            </nav>
                        </nav>
                    </div>
                    <div class="col-md-8">
                        <div data-bs-spy="scroll" data-bs-target="#character-nav" data-bs-smooth-scroll="true" 
                             class="scrollspy-example" tabindex="0" style="height: 70vh; overflow-y: auto;">
                            
                            <section id="description" class="mb-5 pt-2">
                                <h3>Descripción</h3>
                                <img src="${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}" 
                                     alt="${character.name}" class="img-fluid rounded mb-3">
                                <p class="lead">${character.description || 'No hay descripción disponible.'}</p>
                            </section>

                            <section id="comics" class="mb-5 pt-2">
                                <h3>Cómics (${comics.length})</h3>
                                <div class="list-group">
                                    ${comics.map(comic => `
                                        <div class="list-group-item">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">${comic.title}</h6>
                                                <small>${new Date(comic.modified).getFullYear()}</small>
                                            </div>
                                            ${comic.description ? `<small class="text-muted">${comic.description}</small>` : ''}
                                        </div>
                                    `).join('')}
                                    ${comics.length === 0 ? '<p class="text-muted">No hay cómics disponibles</p>' : ''}
                                </div>
                            </section>

                            <section id="series" class="mb-5 pt-2">
                                <h3>Series (${series.length})</h3>
                                <div class="list-group">
                                    ${series.map(serie => `
                                        <div class="list-group-item">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">${serie.title}</h6>
                                                <small>${new Date(serie.modified).getFullYear()}</small>
                                            </div>
                                            ${serie.description ? `<small class="text-muted">${serie.description}</small>` : ''}
                                        </div>
                                    `).join('')}
                                    ${series.length === 0 ? '<p class="text-muted">No hay series disponibles</p>' : ''}
                                </div>
                            </section>

                            <section id="stats" class="mb-5 pt-2">
                                <h3>Estadísticas</h3>
                                <div class="card">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Comics
                                            <span class="badge bg-primary rounded-pill">${character.comics.available}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Series
                                            <span class="badge bg-primary rounded-pill">${character.series.available}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Eventos
                                            <span class="badge bg-primary rounded-pill">${character.events.available}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inicializar scrollspy después de que el modal esté visible
        const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
        new bootstrap.ScrollSpy(scrollSpyElement, {
            target: '#character-nav'
        });

        // Manejar clicks en los botones de navegación
        document.querySelectorAll('#character-nav .nav-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute('data-bs-target');
                const targetElement = document.querySelector(targetId);
                targetElement.scrollIntoView({ behavior: 'smooth' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title h4">${character.name}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar los detalles del personaje. Por favor, intenta nuevamente.
                </div>
            </div>
        `;
    }
}