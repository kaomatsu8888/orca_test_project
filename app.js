(() => {
  const STORAGE_KEY = "todos";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");
  const counter = document.getElementById("todo-counter");
  const clearBtn = document.getElementById("clear-completed");
  const filterBtns = document.querySelectorAll(".filters__btn");

  let todos = load();
  let filter = "all";

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* storage unavailable: keep in-memory only */
    }
  }

  function visibleTodos() {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }

  function render() {
    list.textContent = "";
    for (const todo of visibleTodos()) {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " todo-item--completed" : "");
      li.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-item__checkbox";
      checkbox.checked = todo.completed;
      checkbox.setAttribute("aria-label", "完了にする");

      const text = document.createElement("span");
      text.className = "todo-item__text";
      text.textContent = todo.text;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "todo-item__delete";
      del.setAttribute("aria-label", "削除");
      del.textContent = "×";

      li.append(checkbox, text, del);
      list.append(li);
    }

    const done = todos.filter((t) => t.completed).length;
    counter.textContent = `${done} / ${todos.length}`;
    emptyState.hidden = visibleTodos().length > 0;
    clearBtn.hidden = done === 0;
    filterBtns.forEach((btn) =>
      btn.classList.toggle("filters__btn--active", btn.dataset.filter === filter)
    );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text, completed: false });
    input.value = "";
    save();
    render();
  });

  list.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    if (e.target.closest(".todo-item__delete")) {
      todos = todos.filter((t) => t.id !== li.dataset.id);
    } else if (e.target.matches(".todo-item__checkbox")) {
      const todo = todos.find((t) => t.id === li.dataset.id);
      if (todo) todo.completed = e.target.checked;
    } else {
      return;
    }
    save();
    render();
  });

  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      render();
    })
  );

  clearBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    save();
    render();
  });

  render();
})();
