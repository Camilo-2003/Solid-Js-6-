export function Todo(props) {
  return (
    <>
      <input
        type="checkbox"
        checked={(console.log("test"), props.todo.completed)}
        onChange={props.onInputChange}
      />
      <span
        onDblClick={(e) => {
          e.target.setAttribute("contenteditable", true);
          e.target.focus();
        }}
        onBlur={(e) => {
          e.target.removeAttribute("contenteditable");
          // setTodos(index(), "text", e.target.textContent);
          props.onTextChange(e.target.innerText);
        }}
      >
        <Show when={props.todo.completed} fallback={props.children}>
          <s>{props.children}</s>
        </Show>
      </span>
      <button onclick={props.onRemove}>❌</button>
    </>
  );
}
