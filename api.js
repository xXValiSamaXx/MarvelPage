const API_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Caché simple en localStorage para reducir llamadas redundantes.
// TTL en ms (por defecto 30 minutos)
const CACHE_TTL = 30 * 60 * 1000;

function getCacheKey(endpoint, params) {
    try {
        return `marvel_cache:${endpoint}:${JSON.stringify(params || {})}`;
    } catch (e) {
        return `marvel_cache:${endpoint}:nocache`;
    }
}

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
        // Revisar caché antes de hacer la petición
        const cacheKey = getCacheKey(endpoint, params);
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
            try {
                const cached = JSON.parse(cachedRaw);
                if (cached.timestamp && (Date.now() - cached.timestamp) < CACHE_TTL && cached.data) {
                    // completar barra de progreso visualmente y remover
                    progressBar.querySelector('.progress-bar').style.width = '100%';
                    clearInterval(progressInterval);
                    setTimeout(() => progressBar.remove(), 300);
                    // retornar datos cacheados
                    return cached.data;
                }
            } catch (e) {
                // parsing falló, continuar y sobrescribir caché
            }
        }
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
        // Guardar en caché la respuesta útil (data.data) para futuros reloads
        try {
            const cacheKey = getCacheKey(endpoint, params);
            const toStore = JSON.stringify({ timestamp: Date.now(), data: data.data });
            localStorage.setItem(cacheKey, toStore);
        } catch (e) {
            // Si falla el almacenamiento (quota), no es crítico
            console.warn('No se pudo guardar caché:', e);
        }

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