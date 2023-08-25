import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAlert } from "../../context/AlertProvider";

const TodoForm = (props) => {
  const formCloseRef = useRef();
  const { task, setTask, StatusEnum } = props;
  const form = useForm();
  const { register, handleSubmit,setValue, reset, formState, control  } = form;
  const { errors } = formState;
  const { showAlert } = useAlert();

  const onSubmit = async (data) => {
    let savedTodos = JSON.parse(localStorage.getItem("todos") || "{}");
    let updatedTask = task;
    if (!task?.id) {
      updatedTask = {
        ...updatedTask,
        ...data,
        id: new Date().getTime(),
        created_date: new Date().toGMTString(),
      };
      savedTodos = { [updatedTask.id]: updatedTask, ...savedTodos };
    } else {
      updatedTask = {
        ...updatedTask,
        ...data,
      };
      savedTodos[updatedTask.id] = updatedTask;
    }

    localStorage.setItem("todos", JSON.stringify(savedTodos));
    formCloseRef.current.click();
    showAlert(
      "success",
      `Task ${task?.id ? "updated" : "added"} successfully !!!`
    );
    setTask(updatedTask);
    reset();
  };
  useEffect(() => {
    setValue("title", task?.title);
    setValue("status", task?.status ?? StatusEnum.PENDING);
    setValue("desc", task?.desc);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

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
                {task?.id ? "Update Task" : "Create Task"}
              </h5>
              <button
                ref={formCloseRef}
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    {...register("title", {
                      required: "Title is requried.",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 Characters requried",
                      },
                      maxLength: {
                        value: 256,
                        message: "maximum 256 Characters requried",
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="title"
                  />
                  {errors.title && (
                    <p style={{ color: "red" }}>{errors.title?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="Status" className="form-label">
                    Status
                  </label>
                  <select
                    {...register("status", {
                      required: "Title is requried.",
                    })}
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
                  {errors.status && (
                    <p style={{ color: "red" }}>{errors.status?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <textarea
                    {...register("desc", {
                      required: "Title is requried.",
                      minLength: {
                        value: 5,
                        message: "Minimum 5 Characters requried",
                      },
                    })}
                    rows="10"
                    className="form-control"
                    id="desc"
                  />
                  {errors.desc && (
                    <p style={{ color: "red" }}>{errors.desc?.message}</p>
                  )}
                </div>

                <button type="submit" className="btn btn-success mx-2 my-2">
                  {task?.id ? "Update" : "Create"}
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
              <DevTool control={control} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
