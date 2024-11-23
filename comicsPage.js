async function renderComicsPage(container) {
    container.innerHTML = `
        <div class="container">
            <h1 class="text-center mb-4">Cómics de Marvel</h1>
            <div class="row mb-4">
                <div class="col-md-8 mx-auto">
                    <div class="input-group">
                        <input type="text" id="comic-title" class="form-control" placeholder="Buscar cómic...">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" 
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Filtros Avanzados
                        </button>
                        <div class="dropdown-menu dropdown-menu-end p-3" style="width: 300px;">
                            <h6 class="dropdown-header">Formato</h6>
                            <div class="mb-3">
                                <select class="form-select form-select-sm" id="comicFormat">
                                    <option value="">Todos los formatos</option>
                                    <option value="comic">Comic</option>
                                    <option value="magazine">Magazine</option>
                                    <option value="trade paperback">Trade Paperback</option>
                                    <option value="hardcover">Hardcover</option>
                                    <option value="digest">Digest</option>
                                    <option value="graphic novel">Graphic Novel</option>
                                    <option value="digital comic">Digital Comic</option>
                                </select>
                            </div>

                            <h6 class="dropdown-header">Fecha de Publicación</h6>
                            <div class="mb-3">
                                <select class="form-select form-select-sm" id="dateDescriptor">
                                    <option value="">Cualquier fecha</option>
                                    <option value="lastWeek">Última semana</option>
                                    <option value="thisMonth">Este mes</option>
                                    <option value="nextMonth">Próximo mes</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="yearRange" class="form-label d-flex justify-content-between">
                                    Año: <span id="yearValue">2024</span>
                                </label>
                                <input type="range" class="form-range" id="yearRange" 
                                       min="1939" max="2024" value="2024">
                            </div>

                            <h6 class="dropdown-header">Ordenar por</h6>
                            <div class="mb-3">
                                <select class="form-select form-select-sm" id="comicOrderBy">
                                    <option value="-focDate">Más recientes primero</option>
                                    <option value="focDate">Más antiguos primero</option>
                                    <option value="title">Título (A-Z)</option>
                                    <option value="-title">Título (Z-A)</option>
                                </select>
                            </div>

                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" id="hasDigitalIssue">
                                <label class="form-check-label" for="hasDigitalIssue">
                                    Solo ediciones digitales
                                </label>
                            </div>

                            <div class="d-grid">
                                <button class="btn btn-primary btn-sm" id="applyComicFilters">
                                    Aplicar Filtros
                                </button>
                            </div>
                        </div>
                        <button id="apply-filters" class="btn bg-marvel-blue text-white">Buscar</button>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="comic-list"></div>
            <div class="modal fade" id="comic-details" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content"></div>
                </div>
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('yearRange').addEventListener('input', (e) => {
        document.getElementById('yearValue').textContent = e.target.value;
    });

    document.getElementById('applyComicFilters').addEventListener('click', (e) => {
        e.preventDefault();
        loadComics(1);
    });

    document.getElementById('apply-filters').addEventListener('click', () => loadComics(1));
    document.getElementById('comic-title').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadComics(1);
        }
    });

    // Cargar cómics iniciales
    await loadComics(1);
}

async function loadComics(page = 1) {
    const comicTitle = document.getElementById('comic-title').value;
    const format = document.getElementById('comicFormat').value;
    const dateDescriptor = document.getElementById('dateDescriptor').value;
    const year = document.getElementById('yearRange').value;
    const orderBy = document.getElementById('comicOrderBy').value;
    const hasDigitalIssue = document.getElementById('hasDigitalIssue').checked;
    const comicList = document.getElementById('comic-list');
    const itemsPerPage = 20;
    
    comicList.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando cómics...</p>
        </div>
    `;

    // Remover paginación existente
    const existingPagination = document.querySelector('.pagination-container');
    if (existingPagination) {
        existingPagination.remove();
    }

    let params = { 
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        orderBy
    };

    if (comicTitle) params.titleStartsWith = comicTitle.slice(0, 3);
    if (format) params.format = format;
    if (dateDescriptor) params.dateDescriptor = dateDescriptor;
    if (year) params.startYear = parseInt(year);
    if (hasDigitalIssue) params.hasDigitalIssue = true;

    try {
        const comics = await getComics(params);

        if (comics && comics.results && comics.results.length > 0) {
            comicList.innerHTML = '';
            comics.results.forEach(comic => {
                const comicCard = createElement('div', { class: 'col' }, `
                    <div class="card h-100 shadow-sm">
                        <div class="ratio ratio-1x1">
                            <img src="${comic.thumbnail.path}/standard_large.${comic.thumbnail.extension}" 
                                 class="card-img-top object-fit-cover" alt="${comic.title}">
                        </div>
                        <div class="card-body text-center">
                            <h3 class="card-title h5 text-marvel-red">${comic.title}</h3>
                            <p class="card-text small">${new Date(comic.dates.find(date => date.type === 'onsaleDate').date).getFullYear()}</p>
                            ${format ? `<span class="badge bg-primary">${comic.format}</span>` : ''}
                            ${hasDigitalIssue && comic.digitalId ? '<span class="badge bg-success ms-1">Digital</span>' : ''}
                        </div>
                    </div>
                `);
                comicCard.addEventListener('click', () => showComicDetails(comic));
                comicList.appendChild(comicCard);
            });

            // Añadir paginación
            const totalPages = Math.ceil(comics.total / itemsPerPage);
            const paginationContainer = createElement('div', { 
                class: 'pagination-container d-flex justify-content-center mt-4 mb-4' 
            });
            
            paginationContainer.innerHTML = `
                <nav aria-label="Navegación de páginas">
                    <ul class="pagination">
                        <li class="page-item ${page === 1 ? 'disabled' : ''}">
                            <a class="page-link" href="#" data-page="${page - 1}">Anterior</a>
                        </li>
                        ${page > 2 ? '<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>' : ''}
                        ${page > 3 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
                        ${page > 1 ? `<li class="page-item"><a class="page-link" href="#" data-page="${page - 1}">${page - 1}</a></li>` : ''}
                        <li class="page-item active"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
                        ${page < totalPages ? `<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}">${page + 1}</a></li>` : ''}
                        ${page < totalPages - 2 ? '<li class="page-item disabled"><span class="page-link">...</span></li>' : ''}
                        ${page < totalPages - 1 ? `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>` : ''}
                        <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                            <a class="page-link" href="#" data-page="${page + 1}">Siguiente</a>
                        </li>
                    </ul>
                </nav>
            `;

            // Añadir event listeners a los enlaces de paginación
            paginationContainer.querySelectorAll('.page-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageNum = parseInt(e.target.dataset.page);
                    if (pageNum && !isNaN(pageNum) && pageNum !== page) {
                        loadComics(pageNum);
                    }
                });
            });

            comicList.after(paginationContainer);
        } else {
            comicList.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        No se encontraron cómics con los filtros seleccionados.
                    </div>
                </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        comicList.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar los cómics. Por favor, intenta nuevamente.
                </div>
            </div>`;
    }
}

function showComicDetails(comic) {
    const detailsContainer = document.getElementById('comic-details');
    const modalContent = detailsContainer.querySelector('.modal-content');
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(comic.title + " comic comprar")}`;
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title h4">${comic.title}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <img src="${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}" 
                         alt="${comic.title}" class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-8">
                    <p class="mb-3">${comic.description || 'No hay descripción disponible.'}</p>
                    <p class="mb-4">Fecha de publicación: ${formatDate(comic.dates.find(date => date.type === 'onsaleDate').date)}</p>
                    
                    <div class="list-group list-group-flush mb-4">
                        <div class="list-group-item list-group-item-danger">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Creadores</h5>
                                <small>${comic.creators.available} total</small>
                            </div>
                            ${comic.creators.items.map(creator => `
                                <p class="mb-1">${creator.name}</p>
                                <small class="text-muted">${creator.role}</small>
                            `).join('')}
                        </div>

                        <div class="list-group-item list-group-item-primary">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Personajes</h5>
                                <small>${comic.characters.available} total</small>
                            </div>
                            ${comic.characters.items.map(character => `
                                <p class="mb-1">${character.name}</p>
                            `).join('')}
                        </div>

                        <div class="list-group-item list-group-item-warning">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Detalles</h5>
                                <small>Información adicional</small>
                            </div>
                            <p class="mb-1">Formato: ${comic.format}</p>
                            <p class="mb-1">Páginas: ${comic.pageCount}</p>
                            <small class="text-muted">Serie: ${comic.series.name}</small>
                        </div>
                    </div>

                    <div class="text-center">
                        <a href="${googleSearchUrl}" target="_blank" class="btn bg-marvel-blue text-white">
                            Buscar dónde comprar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(detailsContainer);
    modal.show();
}