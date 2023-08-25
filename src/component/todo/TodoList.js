import React, { useEffect, useRef, useState } from "react";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";
import { useAlert } from "../../context/AlertProvider";

const TodoList = () => {
  const StatusEnum = {
    PENDING: "pending",
    COMPLETE: "complete",
    CANCEL: "cancel",
  };

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(null);
  const formRef = useRef();
  const viewRef = useRef();
  const { showAlert } = useAlert();

  const formModal = (id = null) => {
    setTask(todos[id] ?? null);
    formRef.current.click();
  };

  const viewModal = (id = null) => {
    setTask(todos[id]);
    viewRef.current.click();
  };
  
  const fetchTodo = () => {
    let savedTodos = JSON.parse(localStorage.getItem("todos") || "{}");
    setTodos(savedTodos);
  };

  const updateStatus = (id, status) => {
    if (window.confirm(`Do you want to mark task as ${status} ?`)) {
      todos[id] = {
        ...todos[id],
        status: status,
        created_date: new Date().toGMTString(),
      };
      localStorage.setItem("todos", JSON.stringify(todos));
      setTask(null);
      showAlert("success", "Task Status successfully updated !!!");
    }
  };

  const removeTask = (id) => {
    if (window.confirm("Delete the Task?")) {
      delete todos[id];
      localStorage.setItem("todos", JSON.stringify(todos));
      setTask(null);
      showAlert("success", "Task successfully deleted !!!");
    }
  };

  useEffect(() => {
    fetchTodo();
    //console.log(savedTodos);
  }, [task]);

  return (
    <>
      <TodoTable
        methods={{ formModal, viewModal, updateStatus, removeTask }}
        todos={todos}
        StatusEnum={StatusEnum}
      />
      <TodoForm
        formRef={formRef}
        StatusEnum={StatusEnum}
        task={task}
        setTask={setTask}
      />
      <TodoView viewRef={viewRef} task={task} StatusEnum={StatusEnum} />
    </>
  );
};

export default TodoList;
