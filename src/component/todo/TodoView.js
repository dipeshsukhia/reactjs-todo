import React from "react";

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
                className="btn-close"
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
                  {new Date(created_date).toLocaleString()} &nbsp;&nbsp;
                  <span className={`badge bg-${statusClass(status)}`}>
                      {status.toUpperCase()}
                    </span>
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
