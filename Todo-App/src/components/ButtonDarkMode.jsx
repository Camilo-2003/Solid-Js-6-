import { createEffect, createSignal } from "solid-js";
export function ButtonDarkMode() {
  const darkModeLS = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = createSignal(darkModeLS);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
    localStorage.setItem("darkMode", darkMode());
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  return (
    <button
      class="text-2xl fixed top-0 right-0"
      onclick={() => toggleDarkMode()}
    >
      {" "}
      {darkMode() ? "🌞" : "🌜"}{" "}
    </button>
  );
}
