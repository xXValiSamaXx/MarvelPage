async function renderHomePage(container) {
    // Inicializar Dark Mode si no existe
    initDarkMode();
    
    container.innerHTML = `

        <!-- Hero Banner  -->
        <div class="hero-banner mb-4">
            <div class="container h-100 d-flex align-items-center justify-content-center">
                <div class="text-center">
                    <h2 class="display-4 mb-4">Explora el Universo Marvel</h2>
                    <p class="lead mb-4">Descubre todos los héroes, villanos y sus increíbles historias</p>
                    <div class="d-flex justify-content-center gap-3">
                        <a href="#comics" class="btn btn-danger btn-lg">
                            <i class="bi bi-search me-2"></i>Buscar Personajes
                        </a>
                        <a href="#characters" class="btn btn-outline-light btn-lg">
                            <i class="bi bi-collection me-2"></i>Ver Cómics
                        </a>
                    </div>
                </div>
            </div>
        </div>

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
            <!-- También actualizamos los títulos de sección para que sean navegables -->
            <section class="mb-5">
                <h2 class="text-center mb-4">
                    <a href="#/characters" class="text-decoration-none text-dark">Personajes Populares</a>
                </h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4" id="character-grid"></div>
            </section>
            <section>
                <h2 class="text-center mb-4">
                    <a href="#/comics" class="text-decoration-none text-dark">Cómics Destacados</a>
                </h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4" id="comic-grid"></div>
            </section>
        </div>
    `;

    await renderPopularCharacters();
    await renderRecentComics();
    await renderMarvelComponents(container);

    // Agregar listeners para modo oscuro en los enlaces de títulos
    const titleLinks = document.querySelectorAll('h2 a');
    titleLinks.forEach(link => {
        if (document.body.classList.contains('dark-mode')) {
            link.classList.remove('text-dark');
            link.classList.add('text-light');
        }
    });
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
        // Cambiar el navbar del modal a modo oscuro
        const modalNavbar = document.querySelector('#character-nav');
        if (modalNavbar) {
            modalNavbar.classList.add('navbar-dark');
            modalNavbar.classList.remove('navbar-light');
        }
    }

    // Event listener para toggle
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeBtn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';

        // Cambiar el navbar del modal según el estado
        const modalNavbar = document.querySelector('#character-nav');
        if (modalNavbar) {
            if (isDark) {
                modalNavbar.classList.add('navbar-dark');
                modalNavbar.classList.remove('navbar-light');
            } else {
                modalNavbar.classList.remove('navbar-dark');
                modalNavbar.classList.add('navbar-light');
            }
        }
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

async function renderMarvelComponents(container) {
    const marvelSection = createElement('section', { class: 'container my-5' }, `
        <!-- Formulario de Newsletter -->
        <div class="row mb-5">
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Suscríbete a las novedades de Marvel</h5>
                    </div>
                    <div class="card-body">
                        <form id="newsletterForm" class="needs-validation" novalidate>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingName" placeholder="Tu nombre" required>
                                <label for="floatingName">Nombre</label>
                                <div class="invalid-feedback">
                                    Por favor, ingresa tu nombre
                                </div>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingEmail" placeholder="nombre@ejemplo.com" required>
                                <label for="floatingEmail">Email</label>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un email válido
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">¿Qué contenido te interesa?</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="interestComics" checked>
                                    <label class="form-check-label" for="interestComics">
                                        Cómics y novelas gráficas
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="interestMovies">
                                    <label class="form-check-label" for="interestMovies">
                                        Películas y series
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="interestGames">
                                    <label class="form-check-label" for="interestGames">
                                        Videojuegos
                                    </label>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary w-100" type="submit">Suscribirse</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Agregar la sección al contenedor
    container.appendChild(marvelSection);

    // Event Listeners y funcionalidad

    // Formulario de Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!newsletterForm.checkValidity()) {
                event.stopPropagation();
            } else {
                showToast('¡Éxito!', '¡Gracias por suscribirte! Recibirás noticias de Marvel pronto.');
            }
            newsletterForm.classList.add('was-validated');
        });
    }

    const yearRange = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');
    if (yearRange && yearValue) {
        yearRange.addEventListener('input', (e) => {
            yearValue.textContent = e.target.value;
        });
    }
}
async function getCharacterById(id) {
    const response = await fetchMarvelAPI(`characters/${id}`);
    return response.results[0];
}