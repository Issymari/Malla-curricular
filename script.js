const ciclos = [
  {
    nombre: "Ciclo 1",
    cursos: [
      "Globalización y Realidad Nacional",
      "Ciudadanía y Ética",
      "Antropología Social",
      "Pensamiento Crítico",
      "Pre Cálculo",
      "Psicología: Historia y Sistemas",
      "Administración General",
      "Taller: Desarrollo de Competencias Personales I"
    ]
  },
  {
    nombre: "Ciclo 2",
    cursos: [
      "Comunicación y Literatura I",
      "Análisis de Datos",
      "Matemática para Ciencias Sociales",
      "Psicología del Desarrollo Humano I",
      "Neurociencias I",
      "Fundamentos de Marketing",
      "Electivo I",
      "Taller: Desarrollo de Competencias Personales I"
    ]
  },
  {
    nombre: "Ciclo 3",
    cursos: [
      "Comunicación y Literatura II",
      "Ética y Deontología Psicológica",
      "Neurociencia II",
      "Psicología Cognitiva y del Aprendizaje",
      "Psicología de la Personalidad",
      "Psicología del Desarrollo Humano II",
      "Estadística y Probabilidades",
      "Taller: Desarrollo de Competencias Personales III"
    ]
  },
  {
    nombre: "Ciclo 4",
    cursos: [
      "Psicología Educativa",
      "Psicología Clínica",
      "Psicología Organizacional",
      "Psicología Social",
      "Comportamiento Humano en las Organizaciones",
      "Procesos Creativos",
      "Electivo II",
      "Taller: Desarrollo de Competencias Personales II"
    ]
  },
  {
    nombre: "Ciclo 5",
    cursos: [
      "Filosofía y Ética",
      "Interculturalidad, Diversidad y Psicología",
      "Percepción y Comunicación",
      "Comportamiento del Consumidor",
      "Gestión de Capital Humano",
      "Contabilidad General",
      "Metodología de la Investigación",
    ]
  },
  {
    nombre: "Ciclo 6",
    cursos: [
      "Teorías Psicodinámicas",
      "Teoría de la Motivación y Emoción",
      "Técnicas de Observación y Entrevista Psicológica",
      "Procesos Psicopatológicos",
      "Psicología Humanista y Existencialista",
      "Electivo III",
      "Electivo IV",
      "Taller: Desarrollo de Competencias Profesionales III"
    ]
  },
  {
    nombre: "Ciclo 7",
    cursos: [
      "Positive and Health Psychology",
      "Investigación Cualitativa",
      "Principios de Evaluación, Pruebas de Inteligencia y de procesos cognitivos",
      "Familia: Modelos teóricos y áreas de intervención",
      "Electivo V",
      "Electivo VI",
      "Estadística Inferencial",
      "Taller: Desarrollo de Competencias Personales IV"
    ]
  },
  {
    nombre: "Ciclo 8",
    cursos: [
      "Investigación Cuantitativa",
      "Pruebas de Personalidad y Constructos del Yo",
      "Análisis de Datos II",
      "Planeación Estratégica",
      "Electivo VII",
      "Electivo VIII",
      "Electivo IX",
      "Electivo I Internacional",
      "Taller: Desarrollo de Competencias Profesionales IV"
    ]
  },
  {
    nombre: "Ciclo 9",
    cursos: [
      "Intervención psicológica en Emergencias y Desastres",
      "Construcción y Adaptación de Pruebas",
      "Práctica Preprofesional I",
      "Trabajo de Tesis I",
      "Electivo X",
      "Electivo XI",
      "Electivo II Internacional",
      "Taller: Desarrollo de Competencias Personales V"
    ]
  },
  {
    nombre: "Ciclo 10",
    cursos: [
      "Programas de Promoción y Prevención para el Bienestar Humano",
      "Salud Mental Comunitaria, Consejería e Intervención Psicológica",
      "Entrepreneurship",
      "Práctica Preprofesional II",
      "Trabajo de Tesis II",
      "Electivo XII",
      "Electivo XIII",
      "Taller: Desarrollo de competencias profesionales V"
    ]
  }
];

const contenedor = document.getElementById('contenedor');

ciclos.forEach((ciclo, i) => {
  const div = document.createElement('div');
  div.className = 'ciclo';

  const titulo = document.createElement('h2');
  titulo.textContent = ciclo.nombre;
  div.appendChild(titulo);

  const cursoContenedor = document.createElement('div');
  cursoContenedor.className = 'cursos';

  ciclo.cursos.forEach((curso, j) => {
    const boton = document.createElement('button');
    boton.className = 'boton-curso';
    boton.textContent = curso;

    // Bloquea últimos 2 si no completaste todos los anteriores del ciclo anterior
    if (j >= ciclo.cursos.length - 2 && i !== 0) {
      boton.disabled = true;
    }

    boton.addEventListener('click', () => {
      boton.classList.toggle('aprobado');
      guardarEstado();
      desbloquearCiclo(i + 1);
    });

    cursoContenedor.appendChild(boton);
  });

  div.appendChild(cursoContenedor);
  contenedor.appendChild(div);
});

function desbloquearCiclo(index) {
  const ciclo = document.querySelectorAll('.ciclo')[index];
  if (!ciclo) return;

  const botones = ciclo.querySelectorAll('.boton-curso');
  const anteriores = document.querySelectorAll('.ciclo')[index - 1].querySelectorAll('.boton-curso:not(.aprobado)');

  if (anteriores.length === 0) {
    for (let i = botones.length - 2; i < botones.length; i++) {
      botones[i].disabled = false;
    }
  }
}

function guardarEstado() {
  const estados = [];
  document.querySelectorAll('.boton-curso').forEach(btn => {
    estados.push(btn.classList.contains('aprobado'));
  });
  localStorage.setItem('cursosAprobados', JSON.stringify(estados));
}

function cargarEstado() {
  const estados = JSON.parse(localStorage.getItem('cursosAprobados') || "[]");
  const botones = document.querySelectorAll('.boton-curso');
  estados.forEach((aprobado, i) => {
    if (aprobado) {
      botones[i].classList.add('aprobado');
    }
  });
  for (let i = 1; i < ciclos.length; i++) {
    desbloquearCiclo(i);
  }
}

cargarEstado();
