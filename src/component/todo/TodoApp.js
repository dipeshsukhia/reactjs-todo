import React, { useEffect, useRef, useState } from "react";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";
import Swal from "sweetalert2";

const TodoApp = () => {
  const StatusEnum = {
    PENDING: "pending",
    COMPLETE: "complete",
    CANCEL: "cancel",
  };

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(null);
  const formRef = useRef();
  const viewRef = useRef();

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
    Swal.fire({
      title: `Mark task as ${status}`,
      text: `Do you want to mark task as ${status} ?`,
      icon: "question",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        todos[id] = {
          ...todos[id],
          status: status,
          created_date: new Date().toGMTString(),
        };
        localStorage.setItem("todos", JSON.stringify(todos));
        setTask(todos[id]);
        Swal.fire({
          icon: 'success',
          title: `Task status mark as ${status} !!!`,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  };

  const removeTask = (id) => {
    Swal.fire({
      title: `Delete`,
      text: "Are you sure, you want to delete the Task ?",
      icon: "question",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let deletedTask = todos[id]
        delete todos[id];
        localStorage.setItem("todos", JSON.stringify(todos));
        // for update task state update created_date
        setTask({
          ...deletedTask,
          created_date: new Date().toGMTString(),
        });
        Swal.fire({
          icon: 'success',
          title: 'Task successfully deleted !!!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  };

  useEffect(() => {
    fetchTodo();
    //console.log(savedTodos);
  }, [task]);

  return (
    <>
      <TodoTable
        methods={{ formModal, viewModal, updateStatus, removeTask }}
        todos={Object.values(todos)}
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

export default TodoApp;
