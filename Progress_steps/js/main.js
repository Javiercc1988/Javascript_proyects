// Captura de los pasos
const steps = document.querySelectorAll(".step");

// Barra de progreso
const bar = document.getElementById("bar");

// Botones
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Guardado en que paso estamos
let currentStep = 1;

// FUNCIONALIDAD BOTÓN SIGUIENTE
nextButton.addEventListener("click", () => {
  // Sumamos 1 a los pasos
  if (currentStep < steps.length) {
    currentStep++;
    updateProgress();
  }
});

// FUNCIONALIDAD BOTÓN ANTERIOR
prevButton.addEventListener("click", () => {
  // Restamos 1 a los pasos
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
  }
});

// funcion para actualizar el estado de los pasos
function updateProgress() {
  // Actualizar pasos
  steps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // Actualizar barra
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  bar.style.width = progress + "%";

  // Control de los botones
  if (currentStep === steps.length) {
    console.log("1");
    nextButton.disabled = true;
  } else if (currentStep === 1) {
    console.log("2");
    prevButton.disabled = true;
  } else {
    console.log("3");
    prevButton.disabled = nextButton.disabled = false;
  }
}
