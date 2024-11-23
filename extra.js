async function renderExtraPage(container) {
    container.innerHTML = `
        <div class="container py-4">
            <h1 class="text-center mb-5">Recursos Adicionales de Bootstrap</h1>
            
            <!-- Grid Examples -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Ejemplos de Grid System</h2>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h3 class="h5 mb-0">Grid Básico</h3>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-sm-4">
                                <div class="p-3 border bg-light text-center">Col 4</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="p-3 border bg-light text-center">Col 4</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="p-3 border bg-light text-center">Col 4</div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <div class="p-3 border bg-light text-center">Col 6</div>
                            </div>
                            <div class="col-6">
                                <div class="p-3 border bg-light text-center">Col 6</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h3 class="h5 mb-0">Grid Responsivo</h3>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="p-3 border bg-light text-center">
                                    12 - 6 - 4 - 3
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="p-3 border bg-light text-center">
                                    12 - 6 - 4 - 3
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="p-3 border bg-light text-center">
                                    12 - 6 - 4 - 3
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="p-3 border bg-light text-center">
                                    12 - 6 - 4 - 3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Editor -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Editor de Código</h2>
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h3 class="h5 mb-0">Editor Bootstrap</h3>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" id="run-code">
                                <i class="bi bi-play-fill"></i> Ejecutar
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" id="clear-code">
                                <i class="bi bi-trash"></i> Limpiar
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="code-editor" style="height: 300px"></textarea>
                                    <label for="code-editor">Escribe tu código HTML</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="border rounded p-3 h-100" id="preview">
                                    <p class="text-muted">La vista previa aparecerá aquí</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Ejercicios -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Ejercicios Bootstrap</h2>
                <div class="row row-cols-1 row-cols-md-2 g-4 mb-4">
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title h5">Ejercicio 1: Grid System</h3>
                                <p class="card-text">Crear un layout responsivo usando el sistema de grid de Bootstrap.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn btn-primary btn-sm" onclick="startExercise(1)">
                                        Comenzar
                                    </button>
                                    <span class="badge bg-success">Principiante</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title h5">Ejercicio 2: Formularios</h3>
                                <p class="card-text">Crear un formulario con validación usando Bootstrap.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn btn-primary btn-sm" onclick="startExercise(2)">
                                        Comenzar
                                    </button>
                                    <span class="badge bg-warning text-dark">Intermedio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Quiz -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Quiz Bootstrap</h2>
                <div class="card">
                    <div class="card-body">
                        <div id="quiz-container">
                            <div class="progress mb-4" style="height: 2px;">
                                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                            </div>
                            <h3 class="h5 mb-4" id="quiz-question">¿Listo para comenzar el quiz?</h3>
                            <div class="d-grid gap-2" id="quiz-options">
                                <button class="btn btn-outline-primary" onclick="startQuiz()">
                                    Comenzar Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Interview Prep -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Preparación para Entrevistas</h2>
                <div class="accordion" id="interviewAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                    data-bs-target="#question1">
                                ¿Qué es Bootstrap y cuáles son sus ventajas?
                            </button>
                        </h2>
                        <div id="question1" class="accordion-collapse collapse show" 
                             data-bs-parent="#interviewAccordion">
                            <div class="accordion-body">
                                <p>Bootstrap es un framework front-end que facilita el desarrollo web responsivo.</p>
                                <strong>Ventajas:</strong>
                                <ul>
                                    <li>Sistema de grid responsivo</li>
                                    <li>Componentes predefinidos</li>
                                    <li>Personalizable</li>
                                    <li>Gran comunidad</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Más preguntas de entrevista... -->
                </div>
            </section>

            <!-- Certificate Section -->
            <section class="mb-5">
                <h2 class="border-bottom pb-2 mb-4">Certificación Bootstrap</h2>
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title h5">Obtén tu Certificado de Bootstrap</h3>
                        <p class="card-text">
                            Completa todos los ejercicios y el quiz para obtener tu certificado.
                        </p>
                        <div class="progress mb-4">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 0%">
                                0% Completado
                            </div>
                        </div>
                        <button class="btn btn-primary" id="check-progress" onclick="checkCertificateProgress()">
                            Verificar Progreso
                        </button>
                    </div>
                </div>
            </section>
        </div>
    `;

    // Inicializar funcionalidades
    initializeEditor();
    initializeQuiz();
    initializeExercises();
}

// Funciones del Editor
function initializeEditor() {
    const editor = document.getElementById('code-editor');
    const preview = document.getElementById('preview');
    const runButton = document.getElementById('run-code');
    const clearButton = document.getElementById('clear-code');

    // Configuración inicial
    editor.value = `<!-- Ejemplo básico de Bootstrap -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="alert alert-primary">
        Primera columna
      </div>
    </div>
    <div class="col-md-6">
      <div class="alert alert-success">
        Segunda columna
      </div>
    </div>
  </div>
</div>`;

    runButton.addEventListener('click', () => {
        try {
            // Crear un contenedor seguro para la vista previa
            const safePreview = `
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css" rel="stylesheet">
                    <style>
                        body { padding: 1rem; }
                    </style>
                </head>
                <body>
                    ${editor.value}
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
                </body>
                </html>
            `;

            // Usar un iframe para la vista previa
            preview.innerHTML = '<iframe style="width: 100%; height: 100%; border: none;"></iframe>';
            const iframe = preview.querySelector('iframe');
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(safePreview);
            iframe.contentWindow.document.close();

            showToast('¡Éxito!', 'Código ejecutado correctamente');
        } catch (error) {
            preview.innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error: ${error.message}
                </div>
            `;
        }
    });

    clearButton.addEventListener('click', () => {
        editor.value = '';
        preview.innerHTML = '<p class="text-muted">La vista previa aparecerá aquí</p>';
    });

    // Ejecutar automáticamente al inicio
    runButton.click();
}

// Funciones de Ejercicios
function initializeExercises() {
    const exercises = {
        1: {
            title: "Grid System",
            description: "Crea un layout con 3 columnas en desktop y 1 en móvil",
            template: `<!-- Crea un layout responsivo con 3 columnas -->
<div class="container">
    <div class="row">
        <!-- Agrega aquí tres columnas que ocupen:
             - 12 columnas en móvil (col-12)
             - 4 columnas en desktop (col-md-4) -->
    </div>
</div>`,
            solution: `<div class="container">
    <div class="row">
        <div class="col-12 col-md-4 mb-3">
            <div class="p-3 bg-primary text-white">
                Columna 1
            </div>
        </div>
        <div class="col-12 col-md-4 mb-3">
            <div class="p-3 bg-success text-white">
                Columna 2
            </div>
        </div>
        <div class="col-12 col-md-4 mb-3">
            <div class="p-3 bg-info text-white">
                Columna 3
            </div>
        </div>
    </div>
</div>`,
            verify: function(code) {
                const hasCol12 = code.includes('col-12');
                const hasColMd4 = code.includes('col-md-4');
                const hasThreeColumns = (code.match(/col-12/g) || []).length >= 3;
                return hasCol12 && hasColMd4 && hasThreeColumns;
            }
        },
        2: {
            title: "Formulario con Validación",
            description: "Crea un formulario de contacto con validación",
            template: `<!-- Crea un formulario con validación -->
<form class="needs-validation" novalidate>
    <!-- Agrega campos para:
         - Nombre (requerido)
         - Email (requerido, tipo email)
         - Mensaje (requerido)
         - Botón de envío -->
</form>`,
            solution: `<form class="needs-validation" novalidate>
    <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="name" required>
        <div class="invalid-feedback">
            Por favor ingresa tu nombre
        </div>
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" required>
        <div class="invalid-feedback">
            Por favor ingresa un email válido
        </div>
    </div>
    <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea class="form-control" id="message" rows="3" required></textarea>
        <div class="invalid-feedback">
            Por favor ingresa un mensaje
        </div>
    </div>
    <button class="btn btn-primary" type="submit">Enviar</button>
</form>

<script>
// Activar validación de Bootstrap
(function() {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
</script>`,
            verify: function(code) {
                const hasValidation = code.includes('needs-validation') && code.includes('novalidate');
                const hasRequiredFields = code.includes('required');
                const hasEmailField = code.includes('type="email"');
                const hasInvalidFeedback = code.includes('invalid-feedback');
                return hasValidation && hasRequiredFields && hasEmailField && hasInvalidFeedback;
            }
        }
    };

    window.startExercise = (exerciseId) => {
        const exercise = exercises[exerciseId];
        const editor = document.getElementById('code-editor');
        if (!editor) return;

        editor.value = exercise.template;
        
        // Agregar controles de ejercicio
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'mt-3 d-flex gap-2';
        controlsContainer.innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="showSolution(${exerciseId})">
                Ver Solución
            </button>
            <button class="btn btn-success btn-sm" onclick="verifyExercise(${exerciseId})">
                Verificar Ejercicio
            </button>
        `;

        // Reemplazar controles existentes si los hay
        const existingControls = editor.parentElement.querySelector('.d-flex.gap-2');
        if (existingControls) {
            existingControls.remove();
        }
        editor.parentElement.appendChild(controlsContainer);
        
        // Scroll al editor
        editor.scrollIntoView({ behavior: 'smooth' });
    };

    window.showSolution = (exerciseId) => {
        const exercise = exercises[exerciseId];
        const editor = document.getElementById('code-editor');
        if (!editor) return;

        editor.value = exercise.solution;
        showToast('Solución cargada', 'Puedes estudiar la solución y luego intentar replicarla');
        
        // Ejecutar la solución
        document.getElementById('run-code').click();
    };

    window.verifyExercise = (exerciseId) => {
        const exercise = exercises[exerciseId];
        const editor = document.getElementById('code-editor');
        if (!editor) return;

        const code = editor.value;
        const isCorrect = exercise.verify(code);

        if (isCorrect) {
            showToast('¡Ejercicio Correcto!', 'Has completado el ejercicio exitosamente');
            updateProgress('exercises', exerciseId);
        } else {
            showToast('Intenta de nuevo', 'Tu solución aún no cumple con todos los requisitos', 'error');
        }
    };
}

// Funciones del Quiz
async function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const progressBar = document.querySelector('.progress-bar');
    let currentQuestion = 0;
    let score = 0;
    
    // Preguntas reales de Bootstrap
    const questions = [
        {
            question: "¿Cuál es la clase principal para crear un contenedor en Bootstrap?",
            options: ["container", "wrapper", "main", "section"],
            correct: 0,
            explanation: "La clase 'container' es la clase principal de Bootstrap para crear contenedores responsive."
        },
        {
            question: "¿Qué breakpoint representa 'md' en Bootstrap?",
            options: ["576px", "768px", "992px", "1200px"],
            correct: 1,
            explanation: "El breakpoint 'md' representa 768px en Bootstrap 5."
        },
        {
            question: "¿Cuál es la clase para hacer una imagen responsive en Bootstrap?",
            options: ["img-fluid", "img-responsive", "responsive-img", "fluid-image"],
            correct: 0,
            explanation: "img-fluid es la clase correcta para hacer imágenes responsive en Bootstrap 5."
        },
        {
            question: "¿Qué clase se usa para crear un botón primario en Bootstrap?",
            options: ["btn-primary", "button-primary", "primary-btn", "main-button"],
            correct: 0,
            explanation: "btn-primary es la clase estándar para botones primarios en Bootstrap."
        },
        {
            question: "¿Cuántas columnas tiene el sistema grid de Bootstrap por defecto?",
            options: ["6", "8", "10", "12"],
            correct: 3,
            explanation: "Bootstrap usa un sistema de 12 columnas para su grid system."
        }
    ];

    window.startQuiz = () => {
        score = 0;
        currentQuestion = 0;
        showQuestion(0);
    };

    function showQuestion(index) {
        const question = questions[index];
        progressBar.style.width = `${((index) / questions.length) * 100}%`;
        
        quizContainer.innerHTML = `
            <div class="mb-4">
                <h3 class="h5 mb-3">Pregunta ${index + 1} de ${questions.length}</h3>
                <p class="lead">${question.question}</p>
            </div>
            <div class="d-grid gap-2" id="quiz-options">
                ${question.options.map((option, i) => `
                    <button class="btn btn-outline-primary answer-btn" onclick="checkAnswer(${i})">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="mt-3">
                <small class="text-muted">Progreso actual: ${Math.round((index / questions.length) * 100)}%</small>
            </div>
        `;
    }

    window.checkAnswer = (answerIndex) => {
        const question = questions[currentQuestion];
        const buttons = document.querySelectorAll('.answer-btn');
        
        // Deshabilitar todos los botones
        buttons.forEach(btn => btn.disabled = true);
        
        if (answerIndex === question.correct) {
            // Respuesta correcta
            buttons[answerIndex].classList.remove('btn-outline-primary');
            buttons[answerIndex].classList.add('btn-success');
            score++;
            
            quizContainer.insertAdjacentHTML('beforeend', `
                <div class="alert alert-success mt-3">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    ¡Correcto! ${question.explanation}
                </div>
            `);
        } else {
            // Respuesta incorrecta
            buttons[answerIndex].classList.remove('btn-outline-primary');
            buttons[answerIndex].classList.add('btn-danger');
            buttons[question.correct].classList.remove('btn-outline-primary');
            buttons[question.correct].classList.add('btn-success');
            
            quizContainer.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger mt-3">
                    <i class="bi bi-x-circle-fill me-2"></i>
                    Incorrecto. ${question.explanation}
                </div>
            `);
        }

        // Mostrar botón para siguiente pregunta o finalizar
        setTimeout(() => {
            quizContainer.insertAdjacentHTML('beforeend', `
                <div class="d-grid gap-2 mt-3">
                    <button class="btn btn-primary" onclick="nextQuestion()">
                        ${currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    </button>
                </div>
            `);
        }, 1000);
    };

    window.nextQuestion = () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    };

    function showResults() {
        const percentage = (score / questions.length) * 100;
        let message, className;

        if (percentage >= 80) {
            message = "¡Excelente! Dominas Bootstrap.";
            className = "success";
        } else if (percentage >= 60) {
            message = "¡Bien! Pero aún puedes mejorar.";
            className = "warning";
        } else {
            message = "Necesitas practicar más.";
            className = "danger";
        }

        quizContainer.innerHTML = `
            <div class="text-center">
                <h3 class="mb-4">Resultados del Quiz</h3>
                <div class="progress mb-4" style="height: 30px;">
                    <div class="progress-bar bg-${className}" role="progressbar" 
                         style="width: ${percentage}%" aria-valuenow="${percentage}" 
                         aria-valuemin="0" aria-valuemax="100">
                        ${Math.round(percentage)}%
                    </div>
                </div>
                <p class="lead mb-4">${message}</p>
                <p>Respondiste correctamente ${score} de ${questions.length} preguntas.</p>
                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-primary" onclick="startQuiz()">
                        Intentar de Nuevo
                    </button>
                </div>
            </div>
        `;

        // Actualizar progreso general
        updateProgress('quiz', percentage);
    }
}

// Función para generar certificado
function generateCertificate() {
    const certificateHTML = `
        <div class="certificate p-4 border border-3 rounded-3 text-center">
            <h2 class="mb-4">Certificado de Completación</h2>
            <p class="lead">Este certifica que</p>
            <h3 class="mb-4">Usuario de Marvel Explorer</h3>
            <p>Ha completado exitosamente el</p>
            <h4 class="mb-4">Quiz de Bootstrap 5</h4>
            <p class="mb-4">Fecha: ${new Date().toLocaleDateString()}</p>
            <div class="mt-4">
                <button class="btn btn-primary" onclick="window.print()">
                    Imprimir Certificado
                </button>
            </div>
        </div>
    `;

    // Crear una nueva ventana para el certificado
    const certificateWindow = window.open('', '_blank');
    certificateWindow.document.write(`
        <html>
            <head>
                <title>Certificado Bootstrap</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    .certificate {
                        max-width: 800px;
                        margin: 20px auto;
                        background: #fff;
                        border-color: #198754 !important;
                    }
                    @media print {
                        .btn { display: none; }
                    }
                </style>
            </head>
            <body>
                ${certificateHTML}
            </body>
        </html>
    `);
}

// Sistema de Progreso
let userProgress = {
    exercises: {},
    quiz: 0,
    certificate: false
};

function updateProgress(type, value) {
    if (type === 'exercises') {
        userProgress.exercises[value] = true;
    } else if (type === 'quiz') {
        userProgress.quiz = value;
    }

    // Guardar progreso en localStorage
    localStorage.setItem('bootstrapProgress', JSON.stringify(userProgress));
    checkCertificateProgress();
}

function loadProgress() {
    const savedProgress = localStorage.getItem('bootstrapProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        checkCertificateProgress();
    }
}

function checkCertificateProgress() {
    // Calcular progreso
    const exercisesCompleted = Object.keys(userProgress.exercises).length;
    const totalExercises = 2; // Número total de ejercicios
    const exercisesProgress = (exercisesCompleted / totalExercises) * 100;
    const quizProgress = userProgress.quiz;

    // Calcular progreso total
    const totalProgress = (exercisesProgress + quizProgress) / 2;

    // Actualizar barra de progreso
    const progressBar = document.querySelector('.progress .progress-bar');
    if (progressBar) {
        progressBar.style.width = `${totalProgress}%`;
        progressBar.textContent = `${Math.round(totalProgress)}% Completado`;
    }

    // Verificar si se puede obtener el certificado
    const certificateButton = document.getElementById('check-progress');
    if (certificateButton) {
        if (totalProgress >= 80) {
            certificateButton.textContent = 'Obtener Certificado';
            certificateButton.classList.remove('btn-primary');
            certificateButton.classList.add('btn-success');
            certificateButton.onclick = generateCertificate;
        } else {
            certificateButton.textContent = `${Math.round(totalProgress)}% Completado (Necesitas 80%)`;
        }
    }
}

// Función para mostrar toasts de Bootstrap
function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong><br>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    document.getElementById('toast-container').appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Eliminar el toast después de que se oculte
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}