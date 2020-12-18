import React, { useContext } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react-lite";
import { info } from "console";

const TodoList = () => {
  const todoStore = useContext(TodoStore);
  const {
    todos,
    toggleTodo,
    removeTodo,
    toggleCheckbox,
    selectAll,
    info,
  } = todoStore;

  const handleCheckBoxClick = (id: string, e: any) => {
    toggleCheckbox(e.target.checked, id);
  };

  return (
    <>
      <div className="row">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>
                {info.isSelectedAll && info.total !== 0 ? (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(_) => selectAll()}
                  >
                    Disable all
                  </button>
                ) : null}
                {!info.isSelectedAll && info.total !== 0 ? (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(_) => selectAll()}
                  >
                    All
                  </button>
                ) : null}
              </th>
              <th>Title</th>
              <th>Completed?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={todo.checked}
                    checked={todo.checked}
                    onChange={(e) => {
                      handleCheckBoxClick(todo.id!, e);
                    }}
                  />
                </td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "✅" : ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={(_) => toggleTodo(todo.id!)}
                  >
                    Toggle
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(_) => removeTodo(todo.id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default observer(TodoList);
