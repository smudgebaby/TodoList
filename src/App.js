import React from "react";

import CreateArea from "./CreateArea";
import Todo from "./Todo";
import "./styles.css";

export default function App() {
  const [curTodos, setCurTodos] = React.useState([]);
  const [AllList, setAllList] = React.useState([]);
  const [processingList, setProcessingList] = React.useState([]);
  const [DoneList, setDoneList] = React.useState([]);
  const [status, setStatus] = React.useState(1);
  const [searchStr, setSearchStr] = React.useState();

  function createNewTodos(newTodo) {
    setAllList((prevTodos) => [...prevTodos, newTodo]);
    setAllList((prevTodo) => prevTodo.sort((a, b) => a.order - b.order));
  }

  function deleteTodo(id) {
    setAllList((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  }

  function completeTodo(id) {
    let temp = [...AllList];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].complete = !temp[i].complete;
      }
    }
    setAllList(temp);
  }

  function saveEdit(id, text) {
    let temp = [...AllList];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].content = text;
      }
    }
    setAllList(temp);
  }

  function changeOrder(id, newOrder) {
    let temp = [...AllList];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].order = newOrder;
      }
    }
    temp.sort((a, b) => a.order - b.order);
    setAllList(temp);
  }

  React.useEffect(() => {
    let temp = AllList.filter((list) => list.complete === false);
    setProcessingList(temp);
    let temp2 = AllList.filter((list) => list.complete === true);
    setDoneList(temp2);
    setCurTodos(AllList);
    setStatus(1);
  }, [AllList]);

  //Change showing todos
  function handleAllTodos() {
    setCurTodos(AllList);
    setStatus(1);
  }
  function handleProcessTodos() {
    setCurTodos(processingList);
    setStatus(2);
  }
  function handleDoneTodos() {
    setCurTodos(DoneList);
    setStatus(3);
  }

  //Search Todos
  function handleSearch(value) {
    setSearchStr(value);
  }
  function SearchTodos() {
    let temp = AllList.filter((l) => l.content.indexOf(searchStr) !== -1);
    setCurTodos(temp);
    setStatus(1);
  }

  return (
    <div>
      {AllList.length > 0 ? (
        <div>
          <input
            placeholder="Search the to do list"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={SearchTodos}>Search</button>
          <div>
            {curTodos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  complete={todo.complete}
                  content={todo.content}
                  onDelete={deleteTodo}
                  onComplete={completeTodo}
                  onSaveEdit={saveEdit}
                  order={todo.order}
                  onChangeOrder={changeOrder}
                />
              );
            })}
          </div>
          <div className="status-button">
            <button
              className={status === 1 ? "on" : "off"}
              onClick={handleAllTodos}
            >
              All
            </button>
            <button
              className={status === 2 ? "on" : "off"}
              onClick={handleProcessTodos}
            >
              Processing
            </button>
            <button
              className={status === 3 ? "on" : "off"}
              onClick={handleDoneTodos}
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div>
          <header>No Todos Here...</header>
        </div>
      )}
      <CreateArea onAdd={createNewTodos} />
    </div>
  );
}
