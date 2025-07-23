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
      "Neurociencia I",
      "Psicología del Desarrollo I",
      "Psicología Cognitiva",
      "Psicología General",
      "Ética Profesional",
      "Taller: Desarrollo de Competencias Personales II"
    ]
  },
  {
    nombre: "Ciclo 3",
    cursos: [
      "Psicología del Desarrollo II",
      "Neurociencia II",
      "Psicología de la Motivación",
      "Psicometría",
      "Teorías de la Personalidad",
      "Evaluación Psicológica I",
      "Investigación Cuantitativa",
      "Taller: Desarrollo de Competencias Personales III"
    ]
  },
  {
    nombre: "Ciclo 4",
    cursos: [
      "Psicología Social",
      "Evaluación Psicológica II",
      "Psicología del Aprendizaje",
      "Psicopatología",
      "Psicología de Grupos",
      "Investigación Cualitativa",
      "Taller de Integración I",
      "Taller: Desarrollo de Competencias Personales IV"
    ]
  },
  {
    nombre: "Ciclo 5",
    cursos: [
      "Psicología Educacional",
      "Psicoterapia I",
      "Psicología Organizacional",
      "Psicología de la Salud",
      "Diagnóstico Psicológico",
      "Taller de Integración II",
      "Ética y Legislación en Psicología",
      "Taller: Desarrollo de Competencias Personales V"
    ]
  },
  {
    nombre: "Ciclo 6",
    cursos: [
      "Intervención Psicológica en Educación",
      "Psicoterapia II",
      "Consultoría y Coaching",
      "Promoción de la Salud Mental",
      "Taller de Integración III",
      "Práctica Preprofesional I",
      "Electivo I",
      "Electivo II"
    ]
  },
  {
    nombre: "Ciclo 7",
    cursos: [
      "Supervisión de Casos Clínicos",
      "Evaluación e Intervención en Crisis",
      "Gestión de Proyectos Sociales",
      "Práctica Preprofesional II",
      "Seminario de Tesis I",
      "Electivo III",
      "Electivo IV"
    ]
  },
  {
    nombre: "Ciclo 8",
    cursos: [
      "Psicología Forense",
      "Intervención en Emergencias y Desastres",
      "Psicología Comunitaria",
      "Seminario de Tesis II",
      "Práctica Preprofesional III",
      "Electivo V",
      "Electivo VI"
    ]
  },
  {
    nombre: "Ciclo 9",
    cursos: [
      "Psicología del Consumidor",
      "Terapias Cognitivo Conductuales",
      "Evaluación de Programas",
      "Práctica Preprofesional IV",
      "Electivo VII",
      "Electivo VIII"
    ]
  },
  {
    nombre: "Ciclo 10",
    cursos: [
      "Internado",
      "Electivo IX",
      "Electivo X"
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
