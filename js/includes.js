async function loadComponent(placeholderId, componentPath) {
  const placeholder = document.getElementById(placeholderId);

  if (!placeholder) {
    return Promise.resolve();
  }

  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`Kon ${componentPath} niet laden.`);
    }

    const componentHtml = await response.text();
    placeholder.innerHTML = componentHtml;

    if (placeholderId === "navigation-placeholder") {
      document.dispatchEvent(new Event("componentsLoaded"));
    }
    
    } catch (error) {
      console.error(error);
  }

  return Promise.resolve();
}

const isEnglishPage = window.location.pathname.includes("/en/");

const navigationPath = isEnglishPage
  ? "../components/navigation-en.html"
  : "components/navigation.html";

const footerPath = isEnglishPage
  ? "../components/footer-en.html"
  : "components/footer.html";

// Laad navigatie en footer
Promise.all([
  loadComponent("navigation-placeholder", navigationPath),
  loadComponent("footer-placeholder", footerPath)
]).then(() => {
  // Zodra beide geladen zijn, roep de taalwisselaar aan
  if (typeof updateLanguageSwitcher === "function") {
    updateLanguageSwitcher();
  }
});