import React from "react";
import { FaRegCheckCircle, FaClock, FaThumbsDown } from "react-icons/fa";

const TodoView = (props) => {
  const { task, StatusEnum } = props;
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
        <div className="modal-dialog modal-lg">
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
                  <h5 className="card-title">{title}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{desc}</p>
                </div>
                <div className="card-footer bg-dark text-bg-dark">                  
                  <span
                    className={`badge bg-${statusClass(status)}`}
                    title={status.toUpperCase()}
                  >
                    {status === StatusEnum.COMPLETE && <FaRegCheckCircle />}
                    {status === StatusEnum.CANCEL && <FaThumbsDown />}
                    {status === StatusEnum.PENDING && <FaClock />}
                  </span>&nbsp;&nbsp;
                  {new Date(created_date).toLocaleString()}
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
