import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { FaPlus } from "react-icons/fa";

const TodoTable = (props) => {
  const { todos, StatusEnum } = props;
  const { formModal } = props.methods;
  const [filter, setFilter] = useState();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(todos);
  }, [todos]);

  useEffect(() => {
    setTableData(
      todos.filter((task) => {
        return (
          task?.status?.toLowerCase().match(filter?.toLowerCase()) ||
          task?.title?.toLowerCase().match(filter?.toLowerCase()) ||
          task?.desc?.toLowerCase().match(filter?.toLowerCase())
        );
      })
    );
  }, [filter]);

  return (
    <div>
      <div className="card">
        <div className="card-header bg-dark text-bg-dark d-sm-flex bd-highlight">
          <div className="flex-grow-1 bd-highlight h3">Todo List</div>

          <div className="bd-highlight d-flex start-0">
            <input
                value={filter || ""}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                className="form-control border-end-0 border rounded-pill mx-2"
                type="search"
                placeholder="Search"
                id="example-search-input"
              />
            <button
              type="button"
              title="Add"
              onClick={formModal}
              className="btn btn-success"
            >
              <FaPlus />
            </button>
          </div>    
        </div>
        <div className="card-body shadow">
          <div className="table-responsive">
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
                {!tableData.length && (
                  <tr>
                    <td colSpan="6"> No task Found</td>
                  </tr>
                )}
                {tableData.map((task) => {
                  return (
                    <TodoItem
                      key={task.id}
                      methods={props.methods}
                      task={task}
                      StatusEnum={StatusEnum}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTable;