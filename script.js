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
      "Investigación Cualitativa",
      "Evaluación Psicológica II",
      "Psicopatología",
      "Psicología Social",
      "Psicología de la Percepción",
      "Psicología Educacional",
      "Taller de Herramientas Digitales",
      "Taller: Desarrollo de Competencias Personales IV"
    ]
  },
  {
    nombre: "Ciclo 5",
    cursos: [
      "Psicoterapia Cognitivo Conductual",
      "Psicología Comunitaria",
      "Neuropsicología",
      "Psicología de la Personalidad II",
      "Psicología Clínica I",
      "Taller de Entrevista Psicológica",
      "Práctica Pre Profesional I",
      "Taller: Desarrollo de Competencias Personales V"
    ]
  },
  {
    nombre: "Ciclo 6",
    cursos: [
      "Psicología Clínica II",
      "Psicología Organizacional",
      "Psicología de la Salud",
      "Psicología Jurídica",
      "Taller de Evaluación Psicológica",
      "Intervención Psicológica en Crisis",
      "Práctica Pre Profesional II",
      "Taller: Desarrollo de Competencias Personales VI"
    ]
  },
  {
    nombre: "Ciclo 7",
    cursos: [
      "Taller de Psicoterapia",
      "Taller de Casos Clínicos",
      "Psicología del Trabajo",
      "Intervención Psicológica Comunitaria",
      "Supervisión Profesional",
      "Electivo I",
      "Práctica Pre Profesional III",
      "Seminario de Investigación I"
    ]
  },
  {
    nombre: "Ciclo 8",
    cursos: [
      "Psicología del Consumidor",
      "Intervención Educativa",
      "Psicología Escolar",
      "Psicología Política",
      "Gestión del Talento Humano",
      "Electivo II",
      "Práctica Pre Profesional IV",
      "Seminario de Investigación II"
    ]
  },
  {
    nombre: "Ciclo 9",
    cursos: [
      "Evaluación de Proyectos Psicológicos",
      "Psicología del Desarrollo Adulto y Vejez",
      "Psicología Ambiental",
      "Electivo III",
      "Supervisión Clínica",
      "Electivo IV",
      "Práctica Pre Profesional V",
      "Taller de Cierre Profesional"
    ]
  },
  {
    nombre: "Ciclo 10",
    cursos: [
      "Internado Psicológico I",
      "Internado Psicológico II",
      "Internado Psicológico III",
      "Internado Psicológico IV",
      "Internado Psicológico V",
      "Internado Psicológico VI",
      "Trabajo Final de Carrera I",
      "Trabajo Final de Carrera II"
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
