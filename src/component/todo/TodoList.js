import React, { useEffect, useRef, useState } from "react";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";

const TodoList = () => {
  const StatusEnum = {
    PENDING: "pending",
    COMPLETE: "complete",
    CANCEL: "cancel",
  };

  const initialTask = {
    id: null,
    status: StatusEnum.PENDING,
    title: null,
    desc: null,
    created_date: null,
  };

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(initialTask);
  const formRef = useRef();
  const viewRef = useRef();

  const formModal = (id = null) => {
    if (isNaN(id)) {
      setTask(initialTask);
    } else {
      setTask(todos[id]);
    }

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
    todos[id] = {
      ...todos[id],
      status: status,
      created_date: new Date().toGMTString(),
    };
    localStorage.setItem("todos", JSON.stringify(todos));
    setTask(initialTask);
    window.alert("Status successfully updated");
  };
  
  const removeTask = (id) => {
    delete todos[id];
    localStorage.setItem("todos", JSON.stringify(todos));
    setTask(initialTask);
    window.alert("Status successfully deleted");
  };

  useEffect(() => {
    fetchTodo();
    //console.log(savedTodos);
  }, [task]);

  return (
    <div className="mt-5">
      <TodoTable
        methods={{formModal,viewModal,updateStatus,removeTask}}
        todos={todos}
        StatusEnum={StatusEnum}
      />
      <TodoForm
        formRef={formRef}
        StatusEnum={StatusEnum}
        task={task}
        setTask={setTask}
        initialTask={initialTask}
      />
      <TodoView viewRef={viewRef} task={task} StatusEnum={StatusEnum}/>
    </div>
  );
};

export default TodoList;
