import React from "react";
import TodoItem from "./TodoItem";

const TodoTable = (props) => {
  const { todos, StatusEnum } = props;
  const { formModal, viewModal, updateStatus, removeTask } = props.methods;
  //console.log(todos)
  return (
    <div>
      <div className="card">
        <div className="card-header bg-dark text-bg-dark d-flex bd-highlight">
          <div className="flex-grow-1 bd-highlight h3">Todo List</div>
          <button
            type="button"
            onClick={formModal}
            className="p-2 bd-highlight btn btn-success start-0"
          >
            Add
          </button>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Mark As</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(todos).length === 0 && (
                <tr>
                  <td colSpan="6"> No task Found</td>
                </tr>
              )}
              {Object.entries(todos).length !== 0 &&
                Object.entries(todos).map(([taskKey, taskValue]) => {
                  return (
                    <TodoItem
                      key={taskKey}
                      methods={{
                        formModal,
                        viewModal,
                        updateStatus,
                        removeTask,
                      }}
                      task={taskValue}
                      StatusEnum={StatusEnum}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoTable;
