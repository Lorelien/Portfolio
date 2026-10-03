const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll("[data-reveal]");
const skillProgressElements = document.querySelectorAll("[data-skill-progress]");

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });

  skillProgressElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -24px 0px",
    }
  );

  skillProgressElements.forEach((element) => {
    skillsObserver.observe(element);
  });
}