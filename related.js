document.addEventListener("DOMContentLoaded", () => {
    // 1. Apuntamos al contenedor donde van las tarjetas de video
    const contenedor = document.getElementById("contenedor-videos");

    if (!contenedor) return; // Evita errores si no encuentra el contenedor

    // 2. Ruta exacta hacia tu archivo JSON desde la raíz de Live Server
    fetch("/json/related.json")
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el JSON");
            return response.json();
        })
        .then(videos => {

            // 3. Mezclar el array de videos aleatoriamente (Algoritmo Fisher-Yates)
            for (let i = videos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                        [videos[i], videos[j]] = [videos[j], videos[i]];
            }

            // 4. Tomar únicamente los primeros 8 videos mezclados al azar
            const videosAleatorios = videos.slice(0, 8);

            // 5. Vaciar el contenedor antes de renderizar
            contenedor.innerHTML = "";

            // 6. Recorrer los 8 videos seleccionados e inyectar el HTML
            videosAleatorios.forEach(video => {

                // CORRECCIÓN DE RUTA: Cambiamos las barras invertidas '\' del JSON por '/' para la web
                const urlWeb = video.url.replace(/\\/g, '/');

                const estructuraCard = `
  <article class="pec-card post type-post status-publish format-standard has-post-thumbnail hentry">
    <a class="pec-card__media" href="${video.url}" aria-label="${video.titulo}">
      <img width="640" height="360" src="${video.imagen}" class="attachment-pec-card_size-pec-card_wp-post-image" alt="${video.nombre}" loading="lazy">
      
      <!-- 1. ÍCONO DE PLAY (SVG) -->
      <span class="pec-card__play" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M8 5.8v12.4L18 12 8 5.8Z"></path>
        </svg>
      </span>

      <!-- 2. TEXTO FLOTANTE -->
      <span class="pec-card__watch">Ver ahora</span>
    </a>
    
    <div class="pec-card__body">
      <h3 class="pec-card__title">
        <a href="${video.url}">${video.nombre}</a>
      </h3>
    </div>
  </article>
`;

                contenedor.insertAdjacentHTML('beforeend', estructuraCard);
            });
        })
        .catch(error => console.error("Error cargando el JSON de videos:", error));
});