import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

const initialState = {
  todos: []
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD":
      let todos = [...state.todos];
      todos.unshift(action.payload);
      return { todos: todos };

    case "DELETE":
      let prevTodosState = [...state.todos];

      return {
        todos: prevTodosState.filter((todo) => todo.id !== action.payload.id)
      };

    case "COMPLETE":
      const prevTodos = [...state.todos];

      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === action.payload.id) todo.status = true;
        return todo;
      });

      return { todos: updatedTodos };

    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = React.useReducer(reducerFunction, initialState);

  const [todo, setTodo] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({
        type: "ADD",
        payload: {
          id: new Date(),
          todo: event.target.value,
          status: false
        }
      });
      setTodo("");
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">TodoList</h3>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-control"
        type="text"
        placeholder="Add Todo"
      />
      <>
        {state.todos.map((todo) => (
          <div className="card my-2 shadow-4" key={todo.id}>
            <div className="card-body">
              <p className={todo.status ? `text-decoration-line-through` : ""}>
                {todo.todo}
              </p>
              <button
                className="btn btn-sm btn-success"
                onClick={() =>
                  dispatch({ type: "COMPLETE", payload: { id: todo.id } })
                }
              >
                Complete
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  dispatch({
                    type: "DELETE",
                    payload: {
                      id: todo.id
                    }
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}
