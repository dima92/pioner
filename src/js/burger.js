export const initBurger = () => {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__nav");
  const headerTop = document.querySelector(".header__top");
  const headerBottom = document.querySelector(".header__bottom");
  const contacts = document.querySelector(".header__contacts");
  const callbackBtn = document.querySelector(".header__btn");
  const menuLinks = document.querySelectorAll(
    ".nav__link, .header__btn, .header__link",
  );

  if (!burger || !menu) return;

  const tabletBreakpoint = 992;

  const relocateElements = () => {
    const isMobile = window.innerWidth <= tabletBreakpoint;

    if (isMobile) {
      if (contacts && contacts.parentElement !== menu) {
        menu.append(contacts);
      }
      if (callbackBtn && callbackBtn.parentElement !== menu) {
        menu.append(callbackBtn);
      }
    } else {
      if (contacts && headerTop && contacts.parentElement !== headerTop) {
        headerTop.insertBefore(contacts, burger);
      }
      if (
        callbackBtn &&
        headerBottom &&
        callbackBtn.parentElement !== headerBottom
      ) {
        headerBottom.append(callbackBtn);
      }
    }
  };

  const toggleMenu = (forceClose = false) => {
    const isOpening = forceClose ? false : !menu.classList.contains("is-open");

    burger.classList.toggle("is-open", isOpening);
    menu.classList.toggle("is-open", isOpening);
    document.body.classList.toggle("disable-scroll", isOpening);
    burger.setAttribute("aria-expanded", String(isOpening));
    burger.setAttribute(
      "aria-label",
      isOpening ? "Закрыть меню" : "Открыть меню",
    );
  };

  relocateElements();

  burger.addEventListener("click", () => toggleMenu());

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      toggleMenu(true);
    }
  });

  window.addEventListener("resize", () => {
    relocateElements();
    if (
      window.innerWidth > tabletBreakpoint &&
      menu.classList.contains("is-open")
    ) {
      toggleMenu(true);
    }
  });
};
