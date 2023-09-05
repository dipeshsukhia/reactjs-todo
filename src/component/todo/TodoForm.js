import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
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
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title?.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...register("status", {
                required: "Status is requried.",
              })}
            >
              <option value="">Select</option>
              {Object.values(StatusEnum).map((status) => {
                return (
                  <option value={status} key={status}>
                    {status.toUpperCase()}
                  </option>
                );
              })}
            </Form.Select>
            {errors.status && (
              <p style={{ color: "red" }}>{errors.status?.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              {...register("desc", {
                required: "Description is requried.",
                minLength: {
                  value: 5,
                  message: "Minimum 5 Characters requried",
                },
              })}
              rows="10"
            />
            {errors.desc && (
              <p style={{ color: "red" }}>{errors.desc?.message}</p>
            )}
          </Form.Group>
          <Button
            as="input"
            type="submit"
            value={task?.id ? "Update" : "Create"}
            variant="success"
            className="mx-2 my-2"
          />
          <Button
            as="input"
            type="reset"
            value="Cancel"
            variant="danger"
            className="mx-2 my-2"
            onClick={() => {
              setShow(false);
              reset();
            }}
          />
        </Form>
        <DevTool control={control} />
      </Modal.Body>
    </Modal>
  );
});

export default TodoForm;
