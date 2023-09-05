import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Swal from "sweetalert2";

const TodoForm = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  // Expose the function through the ref
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
  }));

  const { task, setTask, StatusEnum } = props;
  const form = useForm();
  const { register, handleSubmit, setValue, reset, formState, control } = form;
  const { errors } = formState;

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
    setShow(false);
    Swal.fire({
      icon: "success",
      title: `Task ${task?.id ? "updated" : "added"} successfully !!!`,
      showConfirmButton: false,
      timer: 2000,
    });
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
    <Modal show={show} onHide={() => setShow(false)} className="modal-xl">
      <Modal.Header className="modal-header bg-dark text-bg-dark">
        <Modal.Title>{task?.id ? "Update Task" : "Create Task"}</Modal.Title>
        <CloseButton className="bg-light" onClick={() => setShow(false)} />
      </Modal.Header>
      <Modal.Body>
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
                required: "Status is requried.",
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
                required: "Description is requried.",
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
            className="btn btn-danger mx-2 my-2"
            onClick={() => {
              setShow(false);
              reset();
            }}
          >
            Cancel
          </button>
        </form>
        <DevTool control={control} />
      </Modal.Body>
    </Modal>
  );
});

export default TodoForm;
