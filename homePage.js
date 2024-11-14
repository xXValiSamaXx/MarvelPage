async function renderHomePage(container) {
    // Inicializar Dark Mode si no existe
    initDarkMode();
    
    container.innerHTML = `
        <!-- Carousel -->
        <div id="marvelCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#marvelCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#marvelCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#marvelCarousel" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" style="height: 400px;">
                    <img src="https://pics.filmaffinity.com/Spider_Man_No_Way_Home-720081862-large.jpg" 
                         class="d-block w-100" alt="Spider-Man" style="object-fit: cover; height: 100%;">
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="display-4">Spider-Man</h2>
                        <p>Descubre al hombre araña y sus increíbles aventuras.</p>
                    </div>
                </div>
                <div class="carousel-item" style="height: 400px;">
                    <img src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/thorloveandthunder_lob_crd_04.jpg" 
                         class="d-block w-100" alt="Thor" style="object-fit: cover; height: 100%;">
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="display-4">Thor</h2>
                        <p>El dios del trueno en sus últimas aventuras.</p>
                    </div>
                </div>
                <div class="carousel-item" style="height: 400px;">
                    <img src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/doctorstrangeinthemultiverseofmadness_lob_crd_02.jpg" 
                         class="d-block w-100" alt="Doctor Strange" style="object-fit: cover; height: 100%;">
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="display-4">Doctor Strange</h2>
                        <p>Explora el multiverso de la locura.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#marvelCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#marvelCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
                <span class="visually-hidden">Siguiente</span>
            </button>
        </div>

        <div class="container">
            <section class="mb-5">
                <h2 class="text-center mb-4">Personajes Populares</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4" id="character-grid"></div>
            </section>
            <section>
                <h2 class="text-center mb-4">Cómics Destacados</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4" id="comic-grid"></div>
            </section>
        </div>
    `;

    await renderPopularCharacters();
    await renderRecentComics();
}

// Función para inicializar el Dark Mode
function initDarkMode() {
    // Eliminar el botón existente si hay uno
    const existingButton = document.getElementById('darkModeToggle');
    if (existingButton) {
        existingButton.remove();
    }

    // Crear el nuevo botón
    const darkModeBtn = createElement('button', {
        class: 'btn position-fixed bottom-0 end-0 m-3 rounded-circle',
        id: 'darkModeToggle',
        style: 'width: 50px; height: 50px; z-index: 1030;'
    }, '<i class="bi bi-moon-fill"></i>');

    document.body.appendChild(darkModeBtn);

    // Verificar preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    // Event listener para toggle
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeBtn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    });
}

async function renderPopularCharacters() {
    const characterGrid = document.getElementById('character-grid');
    const popularCharacterIds = [1009220, 1009368, 1009610, 1009664, 1009351];
    
    characterGrid.innerHTML = '<div class="col"><p class="text-center">Cargando personajes populares...</p></div>';
    
    const characters = await Promise.all(
        popularCharacterIds.map(id => getCharacterById(id))
    );

    characterGrid.innerHTML = '';
    characters.forEach(character => {
        if (character) {
            const card = createElement('div', { class: 'col' }, `
                <div class="card h-100 shadow-sm">
                    <div class="position-relative">
                        <img src="${character.thumbnail.path}/standard_large.${character.thumbnail.extension}" 
                             class="card-img-top" alt="${character.name}"
                             data-bs-toggle="tooltip" 
                             data-bs-placement="top" 
                             title="Click para ver más detalles">
                        <span class="position-absolute top-0 start-0 badge bg-danger m-2" 
                              data-bs-toggle="tooltip" 
                              data-bs-placement="right" 
                              title="Número de cómics disponibles">
                            ${character.comics.available} cómics
                        </span>
                    </div>
                    <div class="card-body text-center">
                        <h3 class="card-title h5 text-marvel-red mb-2">${character.name}</h3>
                        <div class="d-flex justify-content-around">
                            <span data-bs-toggle="tooltip" 
                                  data-bs-placement="bottom" 
                                  title="Series en las que aparece" 
                                  class="badge bg-primary">
                                ${character.series.available} series
                            </span>
                            <span data-bs-toggle="tooltip" 
                                  data-bs-placement="bottom" 
                                  title="Eventos en los que participa" 
                                  class="badge bg-success">
                                ${character.events.available} eventos
                            </span>
                        </div>
                    </div>
                </div>
            `);
            characterGrid.appendChild(card);
        }
    });

    // Inicializar todos los tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));
}

async function renderRecentComics() {
    const comicGrid = document.getElementById('comic-grid');
    const currentYear = new Date().getFullYear();
    const comics = await getComics({ limit: 5, orderBy: '-focDate', startYear: currentYear - 0 });

    if (comics && comics.results) {
        comicGrid.innerHTML = '';
        comics.results.forEach(comic => {
            const card = createElement('div', { class: 'col' }, `
                <div class="card h-100 shadow-sm">
                    <img src="${comic.thumbnail.path}/standard_large.${comic.thumbnail.extension}" 
                         class="card-img-top" alt="${comic.title}">
                    <div class="card-body text-center">
                        <h3 class="card-title h5 text-marvel-red">${comic.title}</h3>
                        <p class="card-text small">Fecha de publicación: ${formatDate(comic.dates.find(date => date.type === 'onsaleDate').date)}</p>
                    </div>
                </div>
            `);
            comicGrid.appendChild(card);
        });
    }
}

async function getCharacterById(id) {
    const response = await fetchMarvelAPI(`characters/${id}`);
    return response.results[0];
}