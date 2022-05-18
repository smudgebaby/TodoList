import React from "react";
import "./styles.css";

export default function Todo(props) {
  const [editing, setEditing] = React.useState(false);
  const [newText, setNewText] = React.useState(props.content);
  const [prevText, setPrevText] = React.useState(props.content);
  const [order, setOrder] = React.useState(props.order);

  function handleEdit() {
    setEditing(true);
  }
  function handleEditText(change) {
    setNewText(change);
  }

  function handleCancel() {
    setEditing(false);
    setNewText(prevText);
  }
  function handleSave() {
    props.onSaveEdit(props.id, newText);
    setEditing(false);
    setPrevText(newText);
  }
  function handleOrder(change) {
    setOrder(change);
  }
  function handleSaveOrder(event) {
    if (event.key === "Enter") {
      props.onChangeOrder(props.id, order);
    }
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleComplete() {
    props.onComplete(props.id);
  }

  return (
    <div className="todos">
      <input
        value={order}
        type="number"
        onChange={(e) => handleOrder(e.target.value)}
        min="1"
        onKeyDown={handleSaveOrder}
        className="orderInput"
      />
      <div className="singleTodo">
        {!editing ? (
          <div>
            <span
              className={props.complete ? "complete" : "inComplete"}
              onClick={handleComplete}
            >
              {newText}
            </span>
            <button disabled={props.complete} onClick={handleEdit}>
              edit
            </button>
            <button onClick={handleDelete}>delete</button>
          </div>
        ) : (
          <div>
            <input
              value={newText}
              onChange={(e) => handleEditText(e.target.value)}
            />
            <button onClick={handleCancel}>cancel</button>
            <button onClick={handleSave}>save</button>
          </div>
        )}
      </div>
    </div>
  );
}
