import React from "react";

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
        <span className={`badge bg-${statusClass(status)}`}>
          {status.toUpperCase()}
        </span>
      </td>
      <td>{title.substring(0, 25)}...</td>
      <td>{desc.substring(0, 35)}...</td>
      <td>
        <div className="btn-group">
          {Object.values(StatusEnum).map((eStatus) => {
            if (status !== eStatus) {
              return (
                <button
                  key={eStatus}
                  type="button"
                  className={`btn btn-${statusClass(eStatus)}`}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Do you want to mark task as " + eStatus + " ?"
                      )
                    ) {
                      updateStatus(id, eStatus);
                    }
                  }}
                >
                  {eStatus}
                </button>
              );
            }
          })}
        </div>
      </td>
      <td>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => viewModal(id)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => formModal(id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Delete the Task?")) {
                removeTask(id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TodoItem;
