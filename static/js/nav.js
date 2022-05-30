import { $, h } from "./utils.js";

const nav = `
<nav class="flex items-center justify-between flex-wrap bg-gray-500 p-6 w-full">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
    <img src="/img/favicon.ico" alt="logo" class="h-8 w-8 mr-2" />
    <span class="font-semibold text-xl tracking-tight select-none">
        <code> aflinks <span class="hidden md:inline-block">- a better portal</span> </code>
    </span>
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
  { href: "/new", name: "New" },
  { href: "/viewAll", name: "View All" },
  {
    href: "/about",
    name: "About",
  },
];

const render = () => {
  document.body.insertAdjacentHTML("afterbegin", nav);

  const navRoutes = $("#nav-routes");

  const currentPath = window.location.pathname;

  routes.forEach((route) => {
    const link = h("a");
    link.classList.add("block", "mt-4", "lg:inline-block", "lg:mt-0", "hover:text-white", "mr-4");
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
  navToggle.addEventListener("click", () => {
    navRoutes.classList.toggle("hidden");
  });
};

export default { render };
