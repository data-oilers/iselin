document.addEventListener('DOMContentLoaded', () => {

    // ── Smooth scrolling for navigation ──
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Intersection Observer for active nav (fixed) ──
    const sections = document.querySelectorAll('section[id]');
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
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    // ── ApexCharts ──
    const fontFamily = 'Inter, system-ui, sans-serif';

    // Chart 1: Information (Average Delay by Route)
    if (document.querySelector("#chart-information")) {
        new ApexCharts(document.querySelector("#chart-information"), {
            series: [{
                name: 'Retraso Promedio (min)',
                data: [2, 5, 20, 3]
            }],
            chart: { type: 'bar', height: 300, fontFamily, toolbar: { show: false } },
            plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
            colors: ['#3B82F6', '#3B82F6', '#EF4444', '#3B82F6'],
            dataLabels: { enabled: true },
            xaxis: { categories: ['Urbano (Centro)', 'Urbano (Periferia)', 'Media Dist. (Alvear)', 'Larga Dist. (Mza)'] },
            title: { text: 'Puntualidad por Servicio', align: 'center', style: { fontFamily, fontSize: '15px', fontWeight: 700 } },
            tooltip: { y: { formatter: val => val + " minutos" } }
        }).render();
    }

    // Chart 2: Knowledge (Correlation Cash vs Delay)
    if (document.querySelector("#chart-knowledge")) {
        new ApexCharts(document.querySelector("#chart-knowledge"), {
            series: [{ name: "Demora vs Efectivo", data: [[10,2],[15,3],[20,4],[30,5],[40,8],[50,12],[60,15],[70,18],[80,22]] }],
            chart: { type: 'scatter', height: 300, fontFamily, toolbar: { show: false }, zoom: { enabled: false } },
            colors: ['#0D9488'],
            xaxis: { title: { text: '% Pagos en Efectivo' }, tickAmount: 10, min: 0, max: 100 },
            yaxis: { title: { text: 'Demora en Parada (min)' }, tickAmount: 5 },
            title: { text: 'Análisis de Causa Raíz', align: 'center', style: { fontFamily, fontSize: '15px', fontWeight: 700 } },
            markers: { size: 7 }
        }).render();
    }

    // ── Quiz Logic ──
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
                "El Data Lake almacena datos estructurados y no estructurados en su formato nativo.",
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
                "¿Qué acciones debemos tomar?"
            ],
            correct: 3
        },
        {
            question: "¿Qué distingue a un KPI de una métrica de vanidad?",
            options: [
                "El KPI es siempre un número entero.",
                "La métrica de vanidad es más difícil de calcular.",
                "El KPI está directamente vinculado a objetivos estratégicos de negocio.",
                "Las métricas de vanidad son usadas solo por marketing."
            ],
            correct: 2
        }
    ];

    const quizContainer = document.getElementById('quiz-questions');
    if (!quizContainer) return;

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
        Array.from(buttons).forEach(btn => btn.classList.remove('selected'));
        buttons[optionIndex].classList.add('selected');
        optionsDiv.dataset.selected = optionIndex;
    };

    // ── Submit Quiz ──
    document.getElementById('submit-quiz').addEventListener('click', () => {
        const emailInput = document.getElementById('quiz-email');
        const userEmail = emailInput ? emailInput.value.trim() : '';

        if (!userEmail || !userEmail.includes('@')) {
            alert("Por favor, ingresá tu email antes de enviar.");
            if (emailInput) emailInput.focus();
            return;
        }

        let score = 0;
        let allAnswered = true;
        const details = [];

        quizData.forEach((item, index) => {
            const optionsDiv = document.getElementById(`q${index}-options`);
            const selected = optionsDiv.dataset.selected;
            const buttons = optionsDiv.getElementsByClassName('option-btn');

            if (selected === undefined) {
                allAnswered = false;
            } else {
                Array.from(buttons).forEach(btn => btn.disabled = true);
                const isCorrect = parseInt(selected) === item.correct;
                if (isCorrect) {
                    score++;
                    buttons[selected].classList.add('correct');
                } else {
                    buttons[selected].classList.add('incorrect');
                    buttons[item.correct].classList.add('correct');
                }
                details.push(`P${index+1}: ${isCorrect ? '✓' : '✗'} (respondió: "${item.options[selected]}")`);
            }
        });

        if (!allAnswered) {
            alert("Por favor, respondé todas las preguntas antes de enviar.");
            return;
        }

        const resultDiv = document.getElementById('quiz-result');
        resultDiv.textContent = `Resultado: ${score} de ${quizData.length} correctas.`;

        if (score === quizData.length) {
            resultDiv.style.color = "#059669";
            resultDiv.innerHTML += "<br>¡Excelente! Dominas los conceptos.";
        } else if (score >= quizData.length / 2) {
            resultDiv.style.color = "#EA580C";
            resultDiv.innerHTML += "<br>Buen trabajo, pero repasá algunos temas.";
        } else {
            resultDiv.style.color = "#DC2626";
            resultDiv.innerHTML += "<br>Te recomiendo leer el manual nuevamente.";
        }

        // Disable submit button
        document.getElementById('submit-quiz').disabled = true;
        document.getElementById('submit-quiz').textContent = 'Enviado ✓';
        document.getElementById('submit-quiz').style.opacity = '0.6';

        // ── Enviar resultado via FormSubmit.co ──
        fetch('https://formsubmit.co/ajax/branko.almeira96@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: `Autoevaluación ISELIN — ${userEmail} — ${score}/${quizData.length}`,
                Participante: userEmail,
                Resultado: `${score} de ${quizData.length} (${Math.round(score/quizData.length*100)}%)`,
                Fecha: new Date().toLocaleString('es-AR'),
                Detalle: details.join('\n')
            })
        })
        .then(r => r.json())
        .then(data => console.log('Email enviado:', data))
        .catch(err => console.warn('FormSubmit error:', err));
    });
});
