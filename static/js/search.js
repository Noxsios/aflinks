const render = (input, btn) => {
  const performSearch = () => {
    if (input.value.length > 0) {
      window.location.href = `/search?q=${input.value}`;
    }
  };

  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      performSearch();
    }
  });

  btn.addEventListener("click", performSearch);
};

export default { render };
