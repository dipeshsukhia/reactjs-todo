import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  FaTrashAlt,
  FaEdit,
  FaRegEye,
  FaThumbsUp,
  FaClock,
  FaThumbsDown,
} from "react-icons/fa";

const TodoItem = (props) => {
  const { task, StatusEnum } = props;
  const { formModal, viewModal, updateStatus, removeTask } = props.methods;
  const { id, status, title, desc, created_date } = task;

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

  const truncate = (str, maxLength) =>
    str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

  return (
    <tr>
      <td>{new Date(created_date).toLocaleString()}</td>
      <td>
        <h4>
          <Badge bg={statusClass(status)} title={status.toUpperCase()}>
            {status === StatusEnum.COMPLETE && <FaThumbsUp />}
            {status === StatusEnum.CANCEL && <FaThumbsDown />}
            {status === StatusEnum.PENDING && <FaClock />}
          </Badge>
        </h4>
      </td>
      <td>{truncate(title, 25)}</td>
      <td>{truncate(desc, 35)}</td>
      <td>
        <ButtonGroup>
          {Object.values(StatusEnum).map((eStatus) => {
            return status === eStatus ? null : (
              <Button
                title={eStatus.toUpperCase()}
                key={eStatus}
                className={`btn-${statusClass(eStatus)}`}
                onClick={() => {
                  updateStatus(id, eStatus);
                }}
              >
                {eStatus === StatusEnum.COMPLETE && <FaThumbsUp />}
                {eStatus === StatusEnum.CANCEL && <FaThumbsDown />}
                {eStatus === StatusEnum.PENDING && <FaClock />}
              </Button>
            );
          })}
        </ButtonGroup>
      </td>
      <td>
        <ButtonGroup>
          <Button
            title="VIEW"
            className="btn-primary"
            onClick={() => viewModal(id)}
          >
            <FaRegEye />
          </Button>
          <Button
            title="EDIT"
            className="btn-info"
            onClick={() => formModal(id)}
          >
            <FaEdit />
          </Button>
          <Button
            title="DELETE"
            className="btn-danger"
            onClick={() => {
              removeTask(id);
            }}
          >
            <FaTrashAlt />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default TodoItem;
