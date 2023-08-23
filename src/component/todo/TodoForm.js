import React, { useState, useRef } from "react";

const TodoForm = (props) => {
  const formCloseRef = useRef();
  const intialError = {
    status: null,
    title: null,
    desc: null,
  };
  const { task, setTask, StatusEnum, initialTask } = props;
  const [error, setError] = useState(intialError);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let { status, title, desc } = intialError;

    if (!task.status) {
      status = "Status is Requried";
    }
    if (!task.title) {
      title = "Title is Requried";
    }
    if (!task.desc) {
      desc = "Description is Requried";
    }
    setError({
      status: status,
      title: title,
      desc: desc,
    });

    if (!status && !title && !desc) {
      let savedTodos = JSON.parse(localStorage.getItem("todos") || "{}");
      let updatedTask = task;

      // add task
      if (!task.id) {
        updatedTask = {
          ...updatedTask,
          id: new Date().getTime(),
          created_date: new Date().toGMTString(),
        };
        savedTodos = { [updatedTask.id]: updatedTask, ...savedTodos };
      } else {
        savedTodos[updatedTask.id] = updatedTask;
      }

      localStorage.setItem("todos", JSON.stringify(savedTodos));
      formCloseRef.current.click();
      setTask(initialTask);
      alert("Data submit successfully");
    }
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        ref={props.formRef}
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#TODOForm"
      ></button>
      {/* Modal */}
      <div
        className="modal fade"
        id="TODOForm"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-dark text-bg-dark">
              <h5 className="modal-title" id="staticBackdropLabel">
                {task.id ? "Update Task" : "Create Task"}                
              </h5>
              <button
                ref={formCloseRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    value={task.title || ""}
                    onChange={(e) => {
                      setTask({ ...task, title: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="title"
                  />
                  {error.title && <p style={{ color: "red" }}>{error.title}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="Status" className="form-label">
                    Status
                  </label>
                  <select
                    value={task.status || ""}
                    onChange={(e) => {
                      setTask({ ...task, status: e.target.value });
                    }}
                    className="form-select"
                    id="status"
                    aria-describedby="title"
                  >
                    <option value="">Select</option>
                    {Object.values(StatusEnum).map((status) => {
                      return (
                        <option value={status} key={status}>
                          {status.toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                  {error.status && (
                    <p style={{ color: "red" }}>{error.status}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <textarea
                    value={task.desc || ""}
                    onChange={(e) => {
                      setTask({ ...task, desc: e.target.value });
                    }}
                    rows="10"
                    className="form-control"
                    id="desc"
                  />
                  {error.desc && <p style={{ color: "red" }}>{error.desc}</p>}
                </div>

                <button type="submit" className="btn btn-success mx-2 my-2">
                  {task.id ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="btn btn-danger mx-2 my-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
