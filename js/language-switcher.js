(function () {
  // Mapping van Nederlandse naar Engelse pagina's
  const nlToEn = {
    "index.html": "en/index.html",
    "over-mij.html": "en/about.html",
    "projecten.html": "en/projects.html",
    "lumiere.html": "en/lumiere.html",
    "jazzzolder.html": "en/jazzzolder.html",
    "terwinneke.html": "en/terwinneke.html",
    "next.html": "en/next.html",
    "figma-learning.html": "en/figma-learning.html",
    "cookiebeleid.html": "en/cookie-policy.html"
  };

  // Mapping van Engelse naar Nederlandse pagina's
  const enToNl = {
    "index.html": "../index.html",
    "about.html": "../over-mij.html",
    "projects.html": "../projecten.html",
    "lumiere.html": "../lumiere.html",
    "jazzzolder.html": "../jazzzolder.html",
    "terwinneke.html": "../terwinneke.html",
    "next.html": "../next.html",
    "figma-learning.html": "../figma-learning.html",
    "cookie-policy.html": "../cookiebeleid.html"
  };

  function getCurrentPageFilename() {
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1] || "index.html";
  }

  function isEnglishPage() {
    return window.location.pathname.includes("/en/");
  }

  window.updateLanguageSwitcher = function () {
    const switcher = document.querySelector(".language-switcher");
    if (!switcher) return;

    const nlLink = switcher.querySelector('a[lang="nl"]');
    const enLink = switcher.querySelector('a[lang="en"]');
    if (!nlLink || !enLink) return;

    const currentPage = getCurrentPageFilename();

    if (isEnglishPage()) {
      // We zijn op een Engelse pagina
      const nlTarget = enToNl[currentPage];
      if (nlTarget) {
        nlLink.href = nlTarget;
      }

      // EN-link wijst naar zichzelf (huidige pagina)
      enLink.href = currentPage;
      enLink.setAttribute("aria-current", "page");
      nlLink.removeAttribute("aria-current");
    } else {
      // We zijn op een Nederlandse pagina
      const enTarget = nlToEn[currentPage];
      if (enTarget) {
        enLink.href = enTarget;
      }

      // NL-link wijst naar zichzelf (huidige pagina)
      nlLink.href = currentPage;
      nlLink.setAttribute("aria-current", "page");
      enLink.removeAttribute("aria-current");
    }
  };

  // Als de navigatie al geladen is (bijv. bij herlaad), voer meteen uit
  if (document.querySelector(".language-switcher")) {
    window.updateLanguageSwitcher();
  }
})();