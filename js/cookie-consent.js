document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("acceptCookies");
  const rejectButton = document.getElementById("rejectCookies");
  const consentKey = "lorelienCookieConsent";

  const loadContentsquare = () => {
    if (document.getElementById("contentsquareScript")) return;

    const script = document.createElement("script");
    script.id = "contentsquareScript";
    script.src = "https://t.contentsquare.net/uxa/971df162322f7.js";
    script.defer = true;
    document.head.appendChild(script);
  };

  const consent = localStorage.getItem(consentKey);

  if (consent === "accepted") {
    loadContentsquare();
  } else if (!consent && banner) {
    banner.hidden = false;
  }

  acceptButton?.addEventListener("click", () => {
    localStorage.setItem(consentKey, "accepted");
    banner.hidden = true;
    loadContentsquare();
  });

  rejectButton?.addEventListener("click", () => {
    localStorage.setItem(consentKey, "rejected");
    banner.hidden = true;
  });
});

const settingsButton = document.getElementById("cookieSettings");

settingsButton?.addEventListener("click", () => {
  localStorage.removeItem(consentKey);

  if (banner) {
    banner.hidden = false;
  }
});