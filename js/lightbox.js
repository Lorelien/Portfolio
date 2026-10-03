document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.createElement("dialog");
  lightbox.id = "image-lightbox";
  lightbox.setAttribute("aria-label", "Vergrote afbeelding");
  lightbox.innerHTML = `
    <div class="lightbox-wrapper">
      <button class="lightbox-close" aria-label="Sluit vergroting" type="button">&times;</button>
      <img class="lightbox-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-image");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    setTimeout(() => {
      lightbox.close();
      lightboxImg.src = "";
      lightboxImg.alt = "";
    }, 200);
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Sluiten wanneer op de donkere achtergrond buiten de afbeelding geklikt wordt
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-wrapper")) {
      closeLightbox();
    }
  });

  const contentImages = document.querySelectorAll(`
    main figure img,
    main .popup-image-grid img,
    main .project-image-grid img,
    main .jazzzolder-club-gallery img,
    main .jazzzolder-page-gallery img,
    main .next-research-visuals img,
    main .next-visual-direction-grid img,
    main .next-branding-palettes img,
    main .next-logo-iterations img,
    main .next-iterations-grid img,
    main .next-high-fidelity-grid img,
    main .next-final-selection img,
    main .next-contribution-wireframes img,
    main .next-contribution-pages img,
    main .jazzzolder-contribution-images img,
    main .popup-white-image-block img,
    main .popup-feature-image
  `);

  contentImages.forEach((img) => {
    if (
      img.classList.contains("project-line-drawing") ||
      img.classList.contains("project-information-logo") ||
      img.classList.contains("next-project-logo") ||
      img.classList.contains("jazzzolder-project-logo") ||
      img.src.includes(".svg")
    ) {
      return;
    }

    img.classList.add("zoomable-image");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Klik om de afbeelding te vergroten");

    const openImage = () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "Vergrote weergave";
      lightbox.scrollTop = 0; // Reset scrollpositie naar boven
      lightbox.showModal();
      lightbox.classList.add("is-open");
    };

    img.addEventListener("click", openImage);
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage();
      }
    });
  });
});