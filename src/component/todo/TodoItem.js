import React from "react";
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
          <span
            className={`badge bg-${statusClass(status)}`}
            title={status.toUpperCase()}
          >
            {status === StatusEnum.COMPLETE && <FaThumbsUp />}
            {status === StatusEnum.CANCEL && <FaThumbsDown />}
            {status === StatusEnum.PENDING && <FaClock />}
          </span>
        </h4>
      </td>
      <td>{truncate(title, 25)}</td>
      <td>{truncate(desc, 35)}</td>
      <td>
        <div className="btn-group">
          {Object.values(StatusEnum).map((eStatus) => {
            return status === eStatus ? null : (
              <button
                title={eStatus.toUpperCase()}
                key={eStatus}
                type="button"
                className={`btn btn-${statusClass(eStatus)}`}
                onClick={() => {
                  updateStatus(id, eStatus);
                }}
              >
                {eStatus === StatusEnum.COMPLETE && <FaThumbsUp />}
                {eStatus === StatusEnum.CANCEL && <FaThumbsDown />}
                {eStatus === StatusEnum.PENDING && <FaClock />}
              </button>
            );
          })}
        </div>
      </td>
      <td>
        <div className="btn-group">
          <button
            title="VIEW"
            type="button"
            className="btn btn-primary"
            onClick={() => viewModal(id)}
          >
            <FaRegEye />
          </button>
          <button
            title="EDIT"
            type="button"
            className="btn btn-info"
            onClick={() => formModal(id)}
          >
            <FaEdit />
          </button>
          <button
            title="DELETE"
            type="button"
            className="btn btn-danger"
            onClick={() => {
              removeTask(id);
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TodoItem;
