const malla = document.getElementById("malla");

const cursosPorCiclo = {
    "Ciclo 1": [
        "Globalización y Realidad Nacional", "Ciudadanía y Ética", "Antropología Social",
        "Pensamiento Crítico", "Pre Cálculo", "Psicología: Historia y Sistemas",
        "Administración General", "Taller: Desarrollo de Competencias Personales I"
    ],
    "Ciclo 2": [
        "Comunicación y Literatura I", "Análisis de Datos I", "Matemática para Ciencias Sociales",
        "Psicología del Desarrollo Humano I", "Neurociencias I", "Fundamentos de Marketing",
        "Electivo I", "Taller: Desarrollo de Competencias Profesionales I"
    ],
    "Ciclo 3": [
        "Comunicación y Literatura II", "Ética y Deontología Psicológica", "Neurociencias II",
        "Psicología Cognitiva y del Aprendizaje", "Psicología de la Personalidad",
        "Psicología del Desarrollo Humano II", "Estadística y Probabilidades",
        "Taller: Desarrollo de Competencias Personales II"
    ],
    "Ciclo 4": [
        "Psicología Educativa", "Psicología Clínica", "Psicología Organizacional",
        "Psicología Social", "Comportamiento Humano en las Organizaciones",
        "Procesos Creativos", "Electivo II", "Taller: Desarrollo de Competencias Profesionales II"
    ],
    "Ciclo 5": [
        "Filosofía y Ética", "Interculturalidad, Diversidad y Psicología", "Percepción y Comunicación",
        "Comportamiento del Consumidor", "Gestión de Capital Humano", "Contabilidad General",
        "Metodología de la Investigación"
    ],
    "Ciclo 6": [
        "Teorías Psicodinámicas", "Teoría de la Motivación y Emoción", "Técnicas de Observación y Entrevista Psicológica",
        "Procesos Psicopatológicos", "Psicología Humanista y Existencialista", "Electivo III", "Electivo IV",
        "Taller: Desarrollo de Competencias Profesionales III"
    ],
    "Ciclo 7": [
        "Positive and Health Psychology", "Investigación Cualitativa", "Principios de Evaluación, Pruebas de Inteligencia y de procesos cognitivos",
        "Familia: Modelos teóricos y áreas de intervención", "Electivo V", "Electivo VI",
        "Estadística Inferencial", "Taller: Desarrollo de Competencias Personales IV"
    ],
    "Ciclo 8": [
        "Investigación Cuantitativa", "Pruebas de Personalidad y Constructos del Yo", "Análisis de Datos II",
        "Planeación Estratégica", "Electivo VII", "Electivo VIII", "Electivo IX",
        "Electivo I Internacional", "Taller: Desarrollo de Competencias Profesionales IV"
    ],
    "Ciclo 9": [
        "Intervención psicológica en Emergencias y Desastres", "Construcción y Adaptación de Pruebas",
        "Práctica Preprofesional I", "Trabajo de Tesis I", "Electivo X", "Electivo XI",
        "Electivo II Internacional", "Taller: Desarrollo de Competencias Personales V"
    ],
    "Ciclo 10": [
        "Programas de Promoción y Prevención para el Bienestar Humano",
        "Salud Mental Comunitaria, Consejería e Intervención Psicológica", "Entrepreneurship",
        "Práctica Preprofesional II", "Trabajo de Tesis II", "Electivo XII", "Electivo XIII",
        "Taller: Desarrollo de competencias profesionales V"
    ]
};

Object.entries(cursosPorCiclo).forEach(([ciclo, cursos]) => {
    const div = document.createElement("div");
    div.className = "ciclo";

    const title = document.createElement("h2");
    title.textContent = ciclo;
    div.appendChild(title);

    cursos.forEach((curso, i) => {
        const p = document.createElement("p");
        p.className = "curso";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        if (i >= cursos.length - 2) {
            checkbox.disabled = true;
        }

        checkbox.addEventListener("change", () => {
            const checkboxes = div.querySelectorAll("input[type=checkbox]");
            const completos = [...checkboxes].slice(0, cursos.length - 2).every(cb => cb.checked);
            for (let j = cursos.length - 2; j < cursos.length; j++) {
                checkboxes[j].disabled = !completos;
                if (!completos) checkboxes[j].checked = false;
            }
        });

        p.appendChild(checkbox);
        p.append(" " + curso);
        div.appendChild(p);
    });

    malla.appendChild(div);
});
