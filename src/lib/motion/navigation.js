import { createEffectScope } from "./scope";

export function initNavigation() {
  const scope = createEffectScope();
  const requestAnimationFrame = scope.frame;
  const cancelAnimationFrame = scope.cancelFrame;
  const clearTimeout = scope.clearTimeout;
  const setTimeout = scope.timeout;

  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const menu = document.querySelector("#menu"),
    caseDialog = document.querySelector("#case-dialog"),
    enquiry = document.querySelector("#enquiry"),
    menuButton = document.querySelector(".menu-button");
  const curtains = [...menu.querySelectorAll(".menu-curtains i")],
    words = [...menu.querySelectorAll(".nav-word")],
    menuHead = menu.querySelector(".menu-head"),
    menuSocial = menu.querySelector(".menu-aside"),
    menuNav = menu.querySelector(".main-menu"),
    menuFooter = menu.querySelector(".menu-bottom");
  const activeAnimations = new Map();
  let menuClosing = false;
  function tween(el, target, duration, delay = 0) {
    const computed = getComputedStyle(el),
      from = {};
    for (const key of Object.keys(target)) from[key] = computed[key];
    activeAnimations.get(el)?.cancel();
    const animation = el.animate([from, target], {
      duration: motionQuery.matches ? 0 : duration,
      delay: motionQuery.matches ? 0 : delay,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "both",
    });
    activeAnimations.set(el, animation);
    return animation.finished.catch(() => {});
  }
  function alignMenuToggle() {
    const rect = menuButton.getBoundingClientRect();
    menu.style.setProperty("--toggle-left", `${rect.left}px`);
    menu.style.setProperty("--toggle-top", `${rect.top}px`);
    menu.style.setProperty("--toggle-width", `${rect.width}px`);
    menu.style.setProperty("--toggle-height", `${rect.height}px`);
  }
  function openDialog(d) {
    d.showModal();
    document.body.classList.add("lock");
    if (d === menu) {
      alignMenuToggle();
      menuClosing = false;
      menu.classList.remove("menu-closing");
      tween(document.querySelector(".close-menu"), { opacity: "1" }, 350, 220);
      menuButton.setAttribute("aria-expanded", "true");
      curtains.forEach((panel, i) =>
        tween(
          panel,
          {
            transform: "translateY(0%)",
            borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0%",
          },
          1050,
          i * 85,
        ),
      );
      tween(menuHead, { opacity: "1", transform: "translateY(0px)" }, 650, 280);
      tween(menuNav, { opacity: "1" }, 500, 390);
      words.forEach((el, i) =>
        tween(
          el,
          { transform: "translateY(0px)", filter: "blur(0px)", opacity: "1" },
          950,
          410 + i * 70,
        ),
      );
      tween(
        menuSocial,
        { opacity: "1", transform: "translateY(0px)" },
        850,
        570,
      );
      tween(menuFooter, { opacity: "1" }, 650, 620);
    }
  }
  async function closeDialog(d, anchor) {
    if (d !== menu) {
      d.close();
      return;
    }
    if (menuClosing) return;
    menuClosing = true;
    menu.classList.add("menu-closing");
    tween(document.querySelector(".close-menu"), { opacity: "0" }, 220);
    tween(menuSocial, { opacity: "0", transform: "translateY(-10px)" }, 230);
    tween(menuFooter, { opacity: "0" }, 200);
    words.forEach((el, i) =>
      tween(
        el,
        { transform: "translateY(-18px)", filter: "blur(2px)", opacity: "0" },
        250,
        i * 24,
      ),
    );
    tween(menuHead, { opacity: "0", transform: "translateY(-8px)" }, 240);
    // Reverse the entrance: rounded blue sheets settle downward, revealing the page.
    await Promise.all(
      curtains.map((panel, i) =>
        tween(
          panel,
          {
            transform: "translateY(108%)",
            borderRadius: "28% 28% 0% 0% / 12% 12% 0% 0%",
          },
          800,
          120 + (2 - i) * 75,
        ),
      ),
    );
    if (!scope.active) return;
    d.close();
    activeAnimations.forEach((a) => a.cancel());
    activeAnimations.clear();
    menu.classList.remove("menu-closing");
    menuButton.setAttribute("aria-expanded", "false");
    menuClosing = false;
    if (anchor)
      document.querySelector(anchor)?.scrollIntoView({
        behavior: motionQuery.matches ? "instant" : "smooth",
      });
  }
  scope.on(window, "resize", () => {
    if (menu.open) alignMenuToggle();
  });
  document.querySelectorAll("dialog").forEach((d) => {
    scope.on(d, "close", () => {
      if (!document.querySelector("dialog[open]"))
        document.body.classList.remove("lock");
    });
    scope.on(d, "click", (e) => {
      if (e.target === d && d !== menu) {
        const r = d.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          closeDialog(d);
      }
    });
  });
  scope.on(menu, "cancel", (e) => {
    e.preventDefault();
    closeDialog(menu);
  });
  scope.on(menuButton, "click", () => openDialog(menu));
  scope.on(document.querySelector(".close-menu"), "click", () =>
    closeDialog(menu),
  );
  menu.querySelectorAll(".main-menu a").forEach((link) =>
    scope.on(link, "click", async (event) => {
      event.preventDefault();
      const destination = new URL(link.getAttribute("href"), location.href);
      if (destination.pathname === location.pathname) {
        history.replaceState(null, "", destination.hash);
        await closeDialog(menu, destination.hash);
      } else {
        await closeDialog(menu);
        if (scope.active) location.assign(destination.href);
      }
    }),
  );
  scope.on(document.querySelector(".case-close"), "click", () =>
    closeDialog(caseDialog),
  );
  scope.on(document.querySelector(".enquiry-close"), "click", () =>
    closeDialog(enquiry),
  );
  scope.on(document, "click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const contact = target?.closest(
      "#start-project,#enquiry-open,#quick-contact,.footer-enquiry",
    );
    if (contact) {
      event.preventDefault();
      openDialog(enquiry);
      return;
    }
    const project = target?.closest("[data-project]");
    if (project)
      document.dispatchEvent(
        new CustomEvent("flash:project", { detail: project.dataset.project }),
      );
  });
  scope.on(document.querySelector(".menu-project"), "click", async (e) => {
    e.preventDefault();
    if (menuClosing) return;
    await closeDialog(menu);
    if (scope.active) openDialog(enquiry);
  });
  // All contact entry points share the same native dialog and messaging links.
  document
    .querySelectorAll(
      "#start-project,#enquiry-open,#quick-contact,.footer-enquiry,.menu-project",
    )
    .forEach((button) => {
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "enquiry");
    });
  enquiry
    .querySelectorAll(".contact-channel")
    .forEach((link) => scope.on(link, "click", () => closeDialog(enquiry)));

  // At the footer, the persistent contact control becomes a compact chat icon.
  // IntersectionObserver only updates on entry/exit; no animation loop is needed.
  if ("IntersectionObserver" in window) {
    const quickContact = document.querySelector("#quick-contact");
    const footerObserver = new scope.IntersectionObserver((entries) => {
      quickContact.classList.toggle("is-compact", entries[0].isIntersecting);
    });
    footerObserver.observe(document.querySelector("footer"));
  }

  scope.cleanup(() => {
    activeAnimations.forEach((animation) => animation.cancel());
    document
      .querySelectorAll("dialog[open]")
      .forEach((dialog) => dialog.close());
  });
  return () => scope.dispose();
}
