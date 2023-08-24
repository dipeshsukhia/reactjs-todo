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

  function statusClass(status) {
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
  }

  return (
    <tr>
      <th scope="row">{new Date(created_date).toLocaleString()}</th>
      <td>
        <h4>
        <span className={`badge bg-${statusClass(status)}`} title={status.toUpperCase()}>
          {status === StatusEnum.COMPLETE && <FaThumbsUp />}
          {status === StatusEnum.CANCEL && <FaThumbsDown />}
          {status === StatusEnum.PENDING && <FaClock />}
        </span>
        </h4>
      </td>
      <td>{title.substring(0, 25)}...</td>
      <td>{desc.substring(0, 35)}...</td>
      <td>
        <div className="btn-group">
          {Object.values(StatusEnum).map((eStatus) => {
            if (status !== eStatus) {
              return (
                <button
                  title={eStatus.toUpperCase()}
                  key={eStatus}
                  type="button"
                  className={`btn btn-${statusClass(eStatus)}`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Do you want to mark task as ${eStatus} ?`
                      )
                    ) {
                      updateStatus(id, eStatus);
                    }
                  }}
                >
                  {eStatus === StatusEnum.COMPLETE && <FaThumbsUp />}
                  {eStatus === StatusEnum.CANCEL && <FaThumbsDown />}
                  {eStatus === StatusEnum.PENDING && <FaClock />}
                </button>
              );
            }
            return null
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
            className="btn btn-warning"
            onClick={() => formModal(id)}
          >
            <FaEdit />
          </button>
          <button
            title="DELETE"
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Delete the Task?")) {
                removeTask(id);
              }
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
