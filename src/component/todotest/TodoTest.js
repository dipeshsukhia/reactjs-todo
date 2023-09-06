import React, { useState, useEffect } from "react";
import "./todostyle.css";

function TodoTest() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos-data") || "[]");
  });
  const [text, setText] = useState("");

  useEffect(() => {
    // Load todos from local storage when the component mounts
    const storedTodos = JSON.parse(localStorage.getItem("todos-data")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos change
    localStorage.setItem("todos-data", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (text.trim() === "") return;
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a new to-do"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <table className="todo-list">
        <thead>
          <tr>
            <th>Complete</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!todos.length && (
            <tr>
              <td colSpan={3}>No data available</td>
            </tr>
          )}
          {todos.map((todo) => (
            <tr
              key={todo.id}
              className={`${todo.completed ? "completed" : ""}`}
            >
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </td>
              <td>{todo.text}</td>
              <td>
                <input
                  type="button"
                  value="remove"
                  onClick={() => deleteTodo(todo.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTest;
