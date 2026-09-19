async function loadComponent(placeholderId, componentPath) {
  const placeholder = document.getElementById(placeholderId);

  if (!placeholder) {
    return;
  }

  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`Kon ${componentPath} niet laden.`);
    }

    const componentHtml = await response.text();
    placeholder.innerHTML = componentHtml;
  } catch (error) {
    console.error(error);
  }
}

loadComponent("navigation-placeholder", "components/navigation.html");
loadComponent("footer-placeholder", "components/footer.html");