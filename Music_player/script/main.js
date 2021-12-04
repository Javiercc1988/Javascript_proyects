// Datos de las canciones
const songList = [
  {
    title: "Acoustic Breeze",
    file: "acousticbreeze.mp3",
    cover: "1.jpeg",
  },
  {
    title: "A New Beginning",
    file: "anewbeginning.mp3",
    cover: "2.jpeg",
  },
  {
    title: "Creative Minds",
    file: "creativeminds.mp3",
    cover: "3.jpeg",
  },
];

//Canción actual en reproducción
let actualSong = null;

// Capturar elementos del DOM
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// Escuchar los clicks de los controles.
next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());
progressContainer.addEventListener("click", setProgress);

//Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress);

// Escuchar clicks en el boton play
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Cargar y mostrar la lista de canciones
function loadSongs() {
  //Recorrer las canciones
  songList.forEach((song, index) => {
    // Crear el li
    const li = document.createElement("li");
    // Crear el enlace
    const link = document.createElement("a");
    // Hidratar el enlace
    link.textContent = song.title;
    link.href = "#";
    // Escuchar el evento
    link.addEventListener("click", () => loadSong(index));
    //Añadir los enlaces a los li
    li.appendChild(link);
    // Añadir los li a la lista
    songs.appendChild(li);
  });
}

// Cargar canción para reproducir
function loadSong(songIndex) {
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex);
    actualSong = songIndex;
    audio.src = "./audio/" + songList[songIndex].file; // Establecer la ruta del archivo
    // Llamamos a las funciones
    playSong();
    changeCover(songIndex);
    changeSongTitle(songIndex);
  }
}

// Cambiar controles cambiamos la clase del boton PLAY a PAUSE
function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  }
}

// Reproducir Canción
function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls();
  }
}

// Pausar Canción
function pauseSong() {
  audio.pause();
  updateControls();
}

// Cambiar la clave Activa
function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a");
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active");
  }
  links[newIndex].classList.add("active");
}

// Cambiar imagen canción
function changeCover(songIndex) {
  cover.src = "./img/" + songList[songIndex].cover;
}

function changeSongTitle(songIndex) {
  title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong() {
  if (actualSong > 0) {
    loadSong(actualSong - 1);
  } else {
    loadSong(songList.length - 1);
  }
}

// Siguiente canción
function nextSong() {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1);
  } else {
    loadSong(0);
  }
}

// Barra de progreso
function updateProgress(event) {
  // Obtenemos el total y el actual
  const { duration, currentTime } = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

// Barra de progresso clicable
function setProgress(event) {
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}

// Lanzar siguiente canción cuando finaliza la actual
audio.addEventListener("ended", () => nextSong());
//////////////////////////////
loadSongs();
