// CON EL CLICK HAY QUE AÑADIR UNA NUEVA NOTA DENTRO DEL LISTADO
// UNA FUNCION CREARNOTA
// ESCUCHAR ELIMINAR, EDITAR
// AÑADIR PERSISTENCIA CON LOCALSTORAGE

// Seleccionar botón agregar y listado de notas

var botonAgregar = document.querySelector(".crear");
var listadoNotas = document.querySelector(".notas");

// Escuchar clicks y lanzar creación de nota
botonAgregar.addEventListener("click", crearNota);

function crearNota(texto) {
  var elementoNota = document.createElement("article");
  elementoNota.classList.add("nota");

  elementoNota.innerHTML = `
    <nav class="acciones">
        <button class="editar">
            <i class="fas fa-edit"></i>
        </button>
        <button class="eliminar">
            <i class="fas fa-trash-alt"></i>
        </button>
    </nav>
    <div class="contenido">
        <textarea class="edicion" placeholder="Escribe aquí"></textarea>
        <div class="resultado oculto">
        </div>
    </div>
    `;
  // Seleccionar elementos necesarios
  var botonEditar = elementoNota.querySelector(".editar");
  var botonEliminar = elementoNota.querySelector(".eliminar");
  var edicion = elementoNota.querySelector(".edicion");
  var resultado = elementoNota.querySelector(".resultado");

  // Hidratar la nota si hay almacenamiento
  if (typeof(texto) === "string") {
    edicion.value = resultado.textContent = texto;
  }

  // Gestionar vista edicion/normal
  botonEditar.addEventListener("click", function () {
    edicion.classList.toggle("oculto");
    resultado.classList.toggle("oculto");
  });

  // Gestionar la eliminacion de notas
  botonEliminar.addEventListener("click", function () {
    if (confirm("¿Seguro que quieres eliminar la nota?")) elementoNota.remove();
    guardarNotas();
  });

  // Actualizar la vista normal con el contenido de la nota
  edicion.addEventListener("blur", function (evento) {
    resultado.textContent = evento.target.value;
    guardarNotas();
  });

  // Añadimos nota al listado
  listadoNotas.appendChild(elementoNota);
}

// Gestionar persistencia en almacenamiento local

function guardarNotas() {
  var notasActuales = document.querySelectorAll(".edicion");

  var notasAguardar = [];

  for (var i = 0; i < notasActuales.length; i++) {
    notasAguardar.push(notasActuales[i].value);
  }

  // JSON.STRINGIFY TRANSFORMA TODO A STRING Y LUEGO LO VUELVE A CONVERTIR PARA OBTENERLO
  localStorage.setItem("notas", JSON.stringify(notasAguardar));
}

// Al iniciar el programa, cargar las notas(si las hubiese)

var notasGuardadas = JSON.parse(localStorage.getItem("notas"));

if (notasGuardadas) {
  // forEach solo sirve para MATRICES(listas)
  notasGuardadas.forEach(function (nota) {
    crearNota(nota);
  });
}
