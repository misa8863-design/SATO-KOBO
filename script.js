const addRevealDirection = (item, direction) => {
  item.classList.add("reveal");
  item.classList.remove("fadein-left", "fadein-right");
  item.classList.add(direction);
};

document.querySelectorAll(".hero, .section, .final-cta").forEach((section, index) => {
  const direction = index % 2 === 0 ? "fadein-left" : "fadein-right";
  section.querySelectorAll([
    ".hero-visual",
    ".hero-actions",
    ".section-heading",
    ".visual-frame",
    ".section-action",
    ".step-list",
    ".example-grid",
    ".subheading",
    ".care-card",
    ".message-heading",
    ".final-visual",
    ".final-actions"
  ].join(", ")).forEach((item) => addRevealDirection(item, direction));
});

let mobileSectionIndex = 0;
document.querySelectorAll(".mobile-image-stack > .mobile-panel").forEach((panel) => {
  const direction = mobileSectionIndex % 2 === 0 ? "fadein-left" : "fadein-right";
  addRevealDirection(panel, direction);

  const links = panel.nextElementSibling;
  if (links && links.classList.contains("mobile-section-links")) {
    addRevealDirection(links, direction);
  }

  mobileSectionIndex += 1;
});

const items = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("is-visible"));
}

const mobileHeader = document.querySelector(".mobile-site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (mobileHeader && menuToggle && mobileMenu) {
  const closeMenu = () => {
    mobileHeader.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileHeader.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
