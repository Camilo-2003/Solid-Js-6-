import { createEffect, createSignal, createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { ButtonDarkMode } from "./components/ButtonDarkMode";
import { Todo } from "./components/Todo";
function App() {
  const todosLS = JSON.parse(window.localStorage.getItem("todos"));
  const [todos, setTodos] = createStore(
    todosLS ?? [
      { text: "Abrazar un pinguino", completed: true },
      { text: "Saludar pinguino", completed: false },
      { text: "Tomarle foto a un pinguino", completed: false },
    ]
  );

  const [newItem, setNewItem] = createSignal("");

  function addTodo() {
    if (newItem()) {
      // setTodos(todos.length, {
      //   text: newItem(),
      //   completed: false,
      // });
      setTodos(
        produce((todos) => todos.push({ text: newItem(), completed: false }))
      );
      setNewItem("");
    }
  }
  function removeTodo(index) {
    // setTodos((todos) => todos.filter((_, i) => i !== index));
    setTodos(produce((todos) => todos.splice(index, 1)));
  }

  const completedCount = createMemo(
    () => todos.filter((t) => t.completed).length
  );

  createEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <div class="w-full h-full  min-h-screen flex items-center justify-center dark:bg-gray-600 dark:text-white">
      <ButtonDarkMode />
      <div>
        <h1 class="text-2xl text-center">Solid Todo App</h1>
        <input
          class="border dark:text-black dark:bg-white"
          type="text"
          value={newItem()}
          onInput={(e) => setNewItem(e.target.value)}
        />
        <button class="px-2 border" onclick={() => addTodo()}>
          Add
        </button>
        <ul>
          <For each={todos} fallback={<p>No hay items.</p>}>
            {(todo, index) => (
              <li>
                <Todo
                  todo={todo}
                  index={index()}
                  onInputChange={() => {
                    setTodos(
                      produce((todos) => {
                        todos[index()].completed = !todos[index()].completed;
                      })
                    );
                  }}
                  onTextChange={(text) => {
                    setTodos(
                      produce((todos) => {
                        todos[index()].text = text;
                      })
                    );
                  }}
                  onRemove={() => removeTodo(index())}
                >
                  {todo.text}
                </Todo>
              </li>
            )}
          </For>
        </ul>
        <p class="text-sm mt-4">
          Completed count: {(console.log("completed"), completedCount())}
        </p>
      </div>
    </div>
  );
}

export default App;
