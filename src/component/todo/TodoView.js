import React from "react";
import { FaThumbsUp, FaClock, FaThumbsDown } from "react-icons/fa";

const TodoView = (props) => {
  const { task, StatusEnum } = props;

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
    <div>
      {/* Button trigger modal */}
      <button
        ref={props.viewRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#TODOView"
      ></button>
      {/* Modal */}
      <div
        className="modal fade"
        id="TODOView"
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
                View Todo
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="card text-center">
                <div className="card-header bg-dark text-bg-dark">
                  <h5 className="card-title">{task?.title}</h5>
                </div>
                <div className="card-body">
                  <pre className="card-text form-control border-0">{task?.desc}</pre>
                </div>
                <div className="card-footer bg-dark text-bg-dark">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoView;
