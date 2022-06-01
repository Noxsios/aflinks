import { $, h } from "./utils.js";

const nav = `
<nav class="flex items-center justify-between flex-wrap flex-row-reverse bg-gray-500 p-6 w-full z-50 bottom-0 fixed">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight select-none">
        <code> afsearch <span class="hidden md:inline-block">- a better portal</span> </code>
    </span>
    <img src="/img/favicon.ico" alt="logo" class="h-8 w-8 ml-2" />
    </div>
    <div class="block lg:hidden">
    <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
    </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow" id="nav-routes"></div>
    </div>
</nav>
`;

const routes = [
  { href: "/", name: "Home" },
  { href: "/add", name: "Add" },
  // { href: "/search", name: "Search" },
  {
    href: "/about",
    name: "About",
  },
];

const render = () => {
  // document.body.insertAdjacentHTML("afterbegin", nav);
  document.body.insertAdjacentHTML("beforeend", nav);

  const navRoutes = $("#nav-routes");

  const currentPath = window.location.pathname;

  const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

  routes.forEach((route) => {
    const link = h("a");
    link.classList.add(
      "block",
      "mt-4",
      "lg:inline-block",
      "lg:mt-0",
      "hover:text-white",
      "mr-4"
    );
    if (route.href === currentPath) {
      link.classList.add("text-gray-800", "pointer-events-none");
    } else {
      link.classList.add("text-gray-200");
    }
    link.href = route.href;
    link.innerText = route.name;
    navRoutes.append(link);
  });

  const navToggle = $("#nav-toggle");
  if (isMobileScreen) {
    navRoutes.classList.add("hidden");
  }
  navToggle.addEventListener("click", () => {
    navRoutes.classList.toggle("hidden");
  });
};

export default { render };
