import React from "react";
import { nanoid } from "nanoid";

export default function CreateArea(props) {
  const [todo, setTodo] = React.useState({
    id: nanoid(),
    complete: false,
    content: "",
    order: 1
  });

  function handleAdd(event) {
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        content: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    props.onAdd(todo);
    setTodo({
      id: nanoid(),
      complete: false,
      content: "",
      order: 1
    });
    event.preventDefault();
  }

  return (
    <div>
      <input
        placeholder="Come on!!!"
        value={todo.content}
        onChange={handleAdd}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
