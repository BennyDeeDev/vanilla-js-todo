const addedTodoList = document.querySelector("#added-todos");
const doneTodoList = document.querySelector("#done-todos");

const todoInputItem = document.querySelector(".InputItem");
todoInputItem.addEventListener("keyup", onAddTodo);

function onAddTodo(event) {
  if (event.code === "Enter") {
    addedTodoList.append(
      createTodoDiv({
        id: Date.now(),
        text: event.target.value,
        checked: false,
      })
    );
    event.target.value = "";
  }
}

function createTodoDiv(todo) {
  const onTodoChecked = (event) => {
    const todoElement = document.getElementById(todo.id);
    const checked = event.target.checked;
    todoElement.setAttribute("value", !checked);
    todoElement.remove();
    if (checked) {
      doneTodoList.append(todoElement);
    } else {
      addedTodoList.append(todoElement);
    }
  };

  const onTodoDelete = (event) => {
    const todoElement = document.getElementById(todo.id);
    todoElement.remove();
  };

  const container = document.createElement("div");
  container.setAttribute("class", "TodoItemContainer");
  container.setAttribute("id", todo.id);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("value", todo.checked);
  input.setAttribute("id", `todo-${todo.id}`);
  input.addEventListener("change", onTodoChecked);

  const label = document.createElement("label");
  label.setAttribute("for", `todo-${todo.id}`);
  label.setAttribute("class", "TodoItemText");
  label.innerText = todo.text;

  const button = document.createElement("button");
  button.setAttribute("class", "TodoItemDeleteButton");
  button.innerText = String.fromCharCode(0x2715);
  button.addEventListener("click", onTodoDelete);

  container.appendChild(input);
  container.appendChild(label);
  container.appendChild(button);
  return container;
}
