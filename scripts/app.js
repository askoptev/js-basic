"use strict";

let habbits = [
  {
    id: 1,
    icon: "sport",
    name: "Отжимания",
    target: 10,
    days: [
      { comment: "Первый подход всегда даётся тяжело" },
      { comment: "Второй день уже проще" },
    ],
  },
  {
    id: 2,
    icon: "food",
    name: "Правильное питание",
    target: 10,
    days: [{ comment: "Круто!" }],
  },
];
const HABBIT_KEY = "HABBIT_KEY";
//page
const page = {
  manu: document.querySelector(".menu__list"),
};

// utils
function loadData() {
  const habbitString = localStorage.getItem(HABBIT_KEY);
  const habbitArray = JSON.parse(habbitString);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

// render
function rerenderMenu(activeHabbit) {
  if (!activeHabbit) {
    return;
  }
  for (const habbit of habbits) {
    const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
    if (!existed) {
      // create
      const element = document.createElement("button");
      element.setAttribute(`menu-habbit-id="${habbit.id}"`);
      element.classList.add("menu__item");
      element.innerHTML = `<img src="/images/${habbit.icon}.svg" alt="${habbit.name}" />`;
      if (activeHabbit.id === habbit.id) {
        element.classList.add(".menu__item_active");
      }
      page.manu.appendChild(element);
      continue;
    }
    if (activeHabbit.id === habbit.id) {
      existed.classList.add(".menu__item_active");
    } else {
      existed.classList.remove(".menu__item_active");
    }
  }
}

function rerender(activeHabbitId) {
  const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
  rerenderMenu(activeHabbit);
}

// init
(() => {
  loadData();
  rerender(habbits[0].id);
})();
