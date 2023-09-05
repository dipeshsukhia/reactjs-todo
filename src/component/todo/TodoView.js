import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import { FaThumbsUp, FaClock, FaThumbsDown } from "react-icons/fa";

const TodoView = forwardRef((props, ref) => {
  const { task, StatusEnum } = props;
  const [show, setShow] = useState(false);

  // Expose the function through the ref
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
  }));

  const statusClass = (status) => {
    switch (status) {
      case StatusEnum.PENDING:
        return "warning";
      case StatusEnum.COMPLETE:
        return "success";
      case StatusEnum.CANCEL:
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} className="modal-xl">
      <Modal.Header className="modal-header bg-dark text-bg-dark">
        <Modal.Title>View Todo</Modal.Title>
        <CloseButton className="bg-light" onClick={() => setShow(false)} />
      </Modal.Header>
      <Modal.Body>
        <Card className="text-center">
          <Card.Header className="bg-dark text-bg-dark">
            <Card.Title>{task?.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <pre className="card-text form-control border-0">{task?.desc}</pre>
          </Card.Body>
          <Card.Footer className="bg-dark text-bg-dark">
            <span
              className={`badge bg-${statusClass(task?.status)}`}
              title={task?.status.toUpperCase()}
            >
              {task?.status === StatusEnum.COMPLETE && <FaThumbsUp />}
              {task?.status === StatusEnum.CANCEL && <FaThumbsDown />}
              {task?.status === StatusEnum.PENDING && <FaClock />}
            </span>
            &nbsp;&nbsp;
            {new Date(task?.created_date).toLocaleString()}
          </Card.Footer>
        </Card>
      </Modal.Body>
    </Modal>
  );
});

export default TodoView;
