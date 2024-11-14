const API_BASE_URL = 'https://gateway.marvel.com/v1/public';

async function fetchMarvelAPI(endpoint, params = {}) {
    const progressBar = document.createElement('div');
    progressBar.innerHTML = `
        <div class="position-fixed top-0 start-0 end-0" style="z-index: 1060;">
            <div class="progress" style="height: 3px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" 
                     role="progressbar" style="width: 0%"></div>
            </div>
        </div>
    `;
    document.body.appendChild(progressBar);

    const progressBarEl = progressBar.querySelector('.progress-bar');
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        progressBarEl.style.width = `${progress}%`;
    }, 500);

    try {
        const url = new URL(`${API_BASE_URL}/${endpoint}`);
        url.search = new URLSearchParams({
            ...params,
            apikey: config.apiKey,
            ts: config.ts,
            hash: config.hash
        });

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Completar barra de progreso
        progressBarEl.style.width = '100%';
        clearInterval(progressInterval);
        setTimeout(() => progressBar.remove(), 500);

        const data = await response.json();
        showToast('Éxito', 'Datos cargados correctamente');
        return data.data;

    } catch (error) {
        // Mostrar error en la barra de progreso
        progressBarEl.classList.remove('bg-danger');
        progressBarEl.classList.add('bg-danger');
        clearInterval(progressInterval);
        setTimeout(() => progressBar.remove(), 1000);

        showToast('Error', 'Error al cargar los datos', 'error');
        console.error('Error fetching from Marvel API:', error);
        return null;
    }
}

// Funciones específicas para cada tipo de dato
async function getCharacters(params = {}) {
    return fetchMarvelAPI('characters', params);
}

async function getSeries(params = {}) {
    return fetchMarvelAPI('series', params);
}

async function getComics(params = {}) {
    return fetchMarvelAPI('comics', params);
}

async function getEvents(params = {}) {
    return fetchMarvelAPI('events', params);
}

async function searchCharacters(name) {
    return fetchMarvelAPI('characters', { nameStartsWith: name });
}

async function searchComics(title) {
    return fetchMarvelAPI('comics', { titleStartsWith: title });
}