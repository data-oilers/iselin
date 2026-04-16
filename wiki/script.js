document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });

            // Update active state
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Intersection Observer for active nav state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // --- ApexCharts Rendering ---

    // Chart 1: Information (Average Delay by Route)
    const optionsInfo = {
        series: [{
            name: 'Retraso Promedio (min)',
            data: [2, 5, 20, 3]
        }],
        chart: {
            type: 'bar',
            height: 300,
            fontFamily: 'Nunito, sans-serif',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                distributed: true
            }
        },
        colors: ['#3b82f6', '#3b82f6', '#ef4444', '#3b82f6'],
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['Urbano (Centro)', 'Urbano (Periferia)', 'Media Dist. (Alvear)', 'Larga Dist. (Mza)'],
        },
        title: {
            text: 'Puntualidad por Servicio',
            align: 'center',
            style: { fontFamily: 'Outfit, sans-serif', fontSize: '16px' }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " minutos"
                }
            }
        }
    };

    const chartInfo = new ApexCharts(document.querySelector("#chart-information"), optionsInfo);
    chartInfo.render();

    // Chart 2: Knowledge (Correlation Cash vs Delay)
    const optionsKnowledge = {
        series: [{
            name: "Demora vs Efectivo",
            data: [
                [10, 2], [15, 3], [20, 4], [30, 5], [40, 8], [50, 12], [60, 15], [70, 18], [80, 22]
            ]
        }],
        chart: {
            type: 'scatter',
            height: 300,
            fontFamily: 'Nunito, sans-serif',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#8b5cf6'],
        xaxis: {
            title: { text: '% Pagos en Efectivo' },
            tickAmount: 10,
            min: 0,
            max: 100
        },
        yaxis: {
            title: { text: 'Demora en Parada (min)' },
            tickAmount: 5
        },
        title: {
            text: 'Análisis de Causa Raíz',
            align: 'center',
            style: { fontFamily: 'Outfit, sans-serif', fontSize: '16px' }
        },
        markers: {
            size: 6
        }
    };

    const chartKnowledge = new ApexCharts(document.querySelector("#chart-knowledge"), optionsKnowledge);
    chartKnowledge.render();


    // --- Quiz Logic ---
    const quizData = [
        {
            question: "¿Cuál es la diferencia principal entre Dato e Información?",
            options: [
                "No hay diferencia, son sinónimos.",
                "El dato es la materia prima sin contexto; la información son datos procesados con contexto.",
                "La información es numérica y los datos son texto.",
                "Los datos son útiles por sí solos, la información no."
            ],
            correct: 1
        },
        {
            question: "¿Qué significan las siglas ETL?",
            options: [
                "Extract, Transform, Load (Extraer, Transformar, Cargar)",
                "Evaluate, Test, Launch (Evaluar, Probar, Lanzar)",
                "Estimate, Time, Limit (Estimación, Tiempo, Límite)",
                "Export, Transfer, Link (Exportar, Transferir, Enlazar)"
            ],
            correct: 0
        },
        {
            question: "¿Cuál es la característica principal de un Data Lake frente a un Data Warehouse?",
            options: [
                "El Data Lake es más pequeño.",
                "El Data Lake almacena datos estructurados y no estructurados en su formato nativo (schema-on-read).",
                "El Data Warehouse no permite consultas SQL.",
                "El Data Lake solo sirve para datos financieros."
            ],
            correct: 1
        },
        {
            question: "¿Qué pregunta responde la Analítica Prescriptiva?",
            options: [
                "¿Qué pasó?",
                "¿Por qué pasó?",
                "¿Qué pasará?",
                "¿Qué acciones debemos tomar para que suceda?"
            ],
            correct: 3
        },
        {
            question: "¿Qué distingue a un KPI de una métrica de vanidad?",
            options: [
                "El KPI es siempre un número entero.",
                "La métrica de vanidad es más difícil de calcular.",
                "El KPI está directamente vinculado a objetivos estratégicos de negocio; la métrica de vanidad no.",
                "Las métricas de vanidad son usadas solo por el departamento de marketing."
            ],
            correct: 2
        }
    ];

    const quizContainer = document.getElementById('quiz-questions');

    // Render Quiz
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Pregunta ${index + 1}</h3>
            <p>${item.question}</p>
            <div class="options" id="q${index}-options">
                ${item.options.map((option, i) => `
                    <button class="option-btn" onclick="selectOption(${index}, ${i})">${option}</button>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });

    window.selectOption = (questionIndex, optionIndex) => {
        const optionsDiv = document.getElementById(`q${questionIndex}-options`);
        const buttons = optionsDiv.getElementsByClassName('option-btn');

        // Remove selected class from all buttons in this question
        Array.from(buttons).forEach(btn => btn.classList.remove('selected'));

        // Add selected class to clicked button
        buttons[optionIndex].classList.add('selected');

        // Store user answer (you could use a global array or data attribute)
        optionsDiv.dataset.selected = optionIndex;
    };

    document.getElementById('submit-quiz').addEventListener('click', () => {
        let score = 0;
        let allAnswered = true;

        quizData.forEach((item, index) => {
            const optionsDiv = document.getElementById(`q${index}-options`);
            const selected = optionsDiv.dataset.selected;
            const buttons = optionsDiv.getElementsByClassName('option-btn');

            if (selected === undefined) {
                allAnswered = false;
            } else {
                // Disable buttons
                Array.from(buttons).forEach(btn => btn.disabled = true);

                if (parseInt(selected) === item.correct) {
                    score++;
                    buttons[selected].classList.add('correct');
                } else {
                    buttons[selected].classList.add('incorrect');
                    buttons[item.correct].classList.add('correct');
                }
            }
        });

        if (!allAnswered) {
            alert("Por favor, responde todas las preguntas antes de enviar.");
        } else {
            const resultDiv = document.getElementById('quiz-result');
            resultDiv.textContent = `Has obtenido ${score} de ${quizData.length} puntos.`;

            if (score === quizData.length) {
                resultDiv.style.color = "#10b981";
                resultDiv.innerHTML += "<br>¡Excelente! Dominas los conceptos.";
            } else if (score >= quizData.length / 2) {
                resultDiv.style.color = "#f59e0b";
                resultDiv.innerHTML += "<br>Buen trabajo, pero repasa algunos temas.";
            } else {
                resultDiv.style.color = "#ef4444";
                resultDiv.innerHTML += "<br>Te recomiendo leer el manual nuevamente.";
            }
        }
    });
});
