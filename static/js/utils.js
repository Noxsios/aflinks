const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const h = document.createElement.bind(document);

const detectTheme = () => {
  let theme = "light";
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export { $, $$, h, detectTheme, debounce };
