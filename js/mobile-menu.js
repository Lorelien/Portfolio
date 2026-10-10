function setupMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!mobileMenu) {
    return;
  }

  function updateMenuState() {
    if (window.innerWidth <= 600) {
      mobileMenu.removeAttribute("open");
    } else {
      mobileMenu.setAttribute("open", "");
    }
  }

  updateMenuState();
  window.addEventListener("resize", updateMenuState);
}

document.addEventListener("componentsLoaded", setupMobileMenu);