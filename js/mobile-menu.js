function updateMobileMenu() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  document.querySelectorAll(".mobile-menu").forEach((menu) => {
    if (isMobile) {
      menu.removeAttribute("open");
    } else {
      menu.setAttribute("open", "");
    }
  });
}

document.addEventListener("DOMContentLoaded", updateMobileMenu);
window.addEventListener("navigationLoaded", updateMobileMenu);
window.addEventListener("resize", updateMobileMenu);