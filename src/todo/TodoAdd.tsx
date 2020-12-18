import React, { useContext, useState } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react-lite";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const todoStore = useContext(TodoStore);
  const { addTodo, info, removeSelectedTodos } = todoStore;

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    addTodo({
      title: title,
      completed: false,
      checked: false,
    });
    setTitle("");
  };

  return (
    <>
      <div className="alert alert-primary">
        <div className="d-inline col-4">
          Total items: &nbsp;
          <span className="badge badge-info">{info.total}</span>
        </div>
        <div className="d-inline col-4">
          Finished items: &nbsp;
          <span className="badge badge-info">{info.completed}</span>
        </div>
        <div className="d-inline col-4">
          Unfinished items: &nbsp;
          <span className="badge badge-info">{info.notCompleted}</span>
        </div>
        <div className="d-inline col-4">
          Checked
          <span className="badge badge-info">{info.checked}</span>
          <button
            className="btn btn-sm btn-danger ml-3"
            disabled={info.checked === 0}
            onClick={removeSelectedTodos}
          >
            Delete all
          </button>
        </div>
      </div>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={title}
            placeholder="Todo title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={title === ""}
          >
            Add Todo
          </button>
        </div>
      </form>
    </>
  );
};

export default observer(AddTodo);
