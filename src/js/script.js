document.addEventListener("DOMContentLoaded", function () {
    const imagenes = document.querySelector(".imagenes"); // Cambié el nombre de la variable a 'imagenes'
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
  
    let currentIndex = 0;
  
    function updateCarousel() {
      const translateX = -currentIndex * 100 + "%";
      imagenes.style.transform = `translateX(${translateX})`; // Cambié 'carousel' a 'imagenes'
    }
  
    prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Si estamos en la primera imagen, al hacer clic en prev, vamos a la última.
        currentIndex = imagenes.children.length - 1;
      }
      updateCarousel();
    });
  
    nextButton.addEventListener("click", function () {
      if (currentIndex < imagenes.children.length - 1) {
        currentIndex++;
      } else {
        // Si estamos en la última imagen, al hacer clic en siguiente, volvemos a la primera.
        currentIndex = 0;
      }
      updateCarousel();
    });
  });