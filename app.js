document.addEventListener('DOMContentLoaded', function() {
    const appContainer = document.getElementById('app');
    
    // Función para manejar la navegación
    function handleNavigation() {
        const hash = window.location.hash || '#home';
        
        switch(hash) {
            case '#home':
                renderHomePage(appContainer);
                break;
            case '#characters':
                renderCharactersPage(appContainer);
                break;
            case '#comics':
                renderComicsPage(appContainer);
                break;
            case '#events':
                renderEventsPage(appContainer);
                break;
             case '#extra':
                renderExtraPage(appContainer);
                break;
            default:
                renderHomePage(appContainer);
        }
    }

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleNavigation);
    
    // Cargar la página inicial
    handleNavigation();
});