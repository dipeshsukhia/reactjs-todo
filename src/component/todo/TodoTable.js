import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import TodoItem from "./TodoItem";
import { FaPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

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
    <Card>
      <Card.Header className="bg-dark text-bg-dark d-sm-flex bd-highlight">
        <div className="flex-grow-1 bd-highlight h3">Todo List</div>

        <div className="bd-highlight d-flex start-0">
          <Form.Control
            value={filter || ""}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="border-end-0 border rounded-pill mx-2"
            type="search"
            placeholder="Search"
          />
          <Button
            as=""
            type="button"
            title="Add"
            onClick={formModal}
            className="btn btn-success"
          >
            <FaPlus />
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="shadow">
        <Table responsive striped>
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
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TodoTable;
