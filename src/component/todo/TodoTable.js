import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaRegEye,
  FaThumbsUp,
  FaClock,
  FaThumbsDown,
} from "react-icons/fa";

const TodoTable = (props) => {
  const { todos, StatusEnum } = props;
  const { formModal, viewModal, updateStatus, removeTask } = props.methods;
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState();

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

  const columns = [
    {
      name: "Date",
      selector: (row) => new Date(row.created_date).toLocaleString(),
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => {
        return (<h4>
          <span
            className={`badge bg-${statusClass(row.status)}`}
            title={row.status}
          >
            {row.status === StatusEnum.COMPLETE && <FaThumbsUp />}
            {row.status === StatusEnum.CANCEL && <FaThumbsDown />}
            {row.status === StatusEnum.PENDING && <FaClock />}
          </span>
        </h4>)
      },
      sortable: true
    },
    {
      name: "Title",
      selector: (row) => truncate(row.title, 25),
      sortable: true
    },
    {
      name: "Description",
      selector: (row) => truncate(row.desc, 35),
      sortable: true
    },
    {
      name: "Mark As",
      selector: (row) => {
        return (
          <div className="btn-group">
            {Object.values(StatusEnum).map((eStatus) => {
              return row.status === eStatus ? null : (
                <button
                  title={eStatus.toUpperCase()}
                  key={eStatus}
                  type="button"
                  className={`btn btn-${statusClass(eStatus)}`}
                  onClick={() => {
                    updateStatus(row.id, eStatus);
                  }}
                >
                  {eStatus === StatusEnum.COMPLETE && <FaThumbsUp />}
                  {eStatus === StatusEnum.CANCEL && <FaThumbsDown />}
                  {eStatus === StatusEnum.PENDING && <FaClock />}
                </button>
              );
            })}
          </div>
        )
      }
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="btn-group">
            <button
              title="VIEW"
              type="button"
              className="btn btn-primary"
              onClick={() => viewModal(row.id)}
            >
              <FaRegEye />
            </button>
            <button
              title="EDIT"
              type="button"
              className="btn btn-info"
              onClick={() => formModal(row.id)}
            >
              <FaEdit />
            </button>
            <button
              title="DELETE"
              type="button"
              className="btn btn-danger"
              onClick={() => {
                removeTask(row.id);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    setTableData(Object.values(todos))
  }, [todos])

  useEffect(() => {
    setTableData(Object.values(todos).filter(task => {
      return task.title.toLowerCase().match(filter.toLowerCase()) || task.desc.toLowerCase().match(filter.toLowerCase())
    }))
  }, [filter])

  return (
    <div>
      <div className="card">
        <div className="card-body table-responsive">
          <DataTable
            theme="light"
            columns={columns}
            data={tableData}
            title="Todo List"
            fixedHeader
            fixedHeaderScrollHeight={window.innerHeight - 290 + 'px'}
            pagination
            paginationPerPage={15}
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input type="text" placeholder="Search" className="w-25 form-control" value={filter || ''} onChange={(e) => { setFilter(e.target.value) }} />
            }
            actions={
              <button
                type="button"
                onClick={formModal}
                className="p-2 bd-highlight btn btn-success start-0"
              >
                <FaPlus /> &nbsp;Add
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TodoTable;
