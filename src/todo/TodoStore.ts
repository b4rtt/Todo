import { observable, action, computed, reaction, makeObservable } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  checked: boolean;
}

class TodoStore {
  todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false, checked: false },
    { id: uuidv4(), title: "Item #2", completed: false, checked: false },
    { id: uuidv4(), title: "Item #3", completed: false, checked: false },
    { id: uuidv4(), title: "Item #4", completed: false, checked: false },
    { id: uuidv4(), title: "Item #5", completed: true, checked: false },
    { id: uuidv4(), title: "Item #6", completed: true, checked: false },
  ];

  constructor() {
    reaction(
      () => this.todos,
      (_) => console.log(this.todos.length)
    );

    makeObservable(this, {
      todos: observable,
    });
  }

  @action addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() });
  };

  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  };

  @action toggleCheckbox = (checked: boolean, id: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: checked,
        };
      }
      return todo;
    });
  };

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  @action selectAll = () => {
    if (this.todos.filter((todo) => !todo.checked).length === 0) {
      this.todos = this.todos.map((todo) => {
        return {
          ...todo,
          checked: false,
        };
      });
    } else {
      this.todos = this.todos.map((todo) => {
        return {
          ...todo,
          checked: true,
        };
      });
    }
  };

  @action removeSelectedTodos = () => {
    this.todos = this.todos.filter((todo) => !todo.checked);
  };

  @computed get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((todo) => todo.completed).length,
      notCompleted: this.todos.filter((todo) => !todo.completed).length,
      checked: this.todos.filter((todo) => todo.checked).length,
      isSelectedAll:
        this.todos.length === this.todos.filter((todo) => todo.checked).length
          ? true
          : false,
    };
  }
}

export default createContext(new TodoStore());
