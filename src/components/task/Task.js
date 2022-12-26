import axios from "axios";
import React, { useEffect, useState } from "react";
import "./task.css";
// import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function Task() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setactivePage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [showModal, setShowModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({});

  useEffect(() => {
    let localData = localStorage.getItem("listData");
    if (localData) {
      setDataList(JSON.parse(localData));
    } else {
      getDatafromApi();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(dataList));
  }, [dataList]);

  useEffect(() => {
    setactivePage(
      searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
    );
  }, [searchParams.get("page")]);

  const getDatafromApi = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const indexOfLastRecord = activePage * 10;
  const indexOfFirstRecord = indexOfLastRecord - 10;
  const paginateData = dataList.slice(indexOfFirstRecord, indexOfLastRecord);

  const deleteData = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (paginateData.length <= 1) {
        setSearchParams("page=" + (activePage - 1));
      }
      setDataList(dataList.filter((data) => data.id !== id));
    }, 1000);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const submitTask = (e) => {
    e.preventDefault();
    let obj = {
      completed: modalFormData?.completed || false,
      title: modalFormData?.title,
      id: dataList[dataList.length - 1]?.id + 1,
      userId: modalFormData?.userId ? parseInt(modalFormData?.userId) : ""
    };
    handleClose();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDataList([...dataList, obj]);
      setModalFormData({});
    }, 1000);
    // toast.success("Add successfully");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setModalFormData({ ...modalFormData, [name]: value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 p-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Task
          </button>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered my-2 border">
              <thead className="text-nowrap bg-primary text-white">
                <tr>
                  <th>Sr No.</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Completed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-nowrap">
                {!isLoading &&
                  paginateData?.map((sdata, index) => {
                    return (
                      <tr key={index}>
                        <td>{indexOfFirstRecord + index + 1}</td>
                        <td>{sdata?.id}</td>
                        <td>{sdata?.title}</td>
                        <td>{sdata?.completed ? "True" : "False"}</td>
                        <td>
                          <button
                            className="btn-sm btn-danger"
                            onClick={() => deleteData(sdata?.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {isLoading && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <span className="paginationCenter">
                        <span className="spinner-border mr-2"></span>
                        Loading...
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="col-md-12">
            <div className="paginationCenter my-2">
              <Pagination
                pageRangeDisplayed={3}
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={dataList.length}
                onChange={(page) => {
                  setIsLoading(true);
                  setSearchParams("page=" + page);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);
                }}
              />
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={submitTask}>
                  <div className="form-group">
                    <label>User Id</label>
                    <input
                      type="number"
                      name="userId"
                      className="form-control"
                      required
                      value={modalFormData?.userId || ""}
                      onChange={handleChange}
                      min={0}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      required
                      value={modalFormData?.title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="check2"
                        name="completed"
                        onChange={(e) => {
                          setModalFormData({
                            ...modalFormData,
                            [e.target.name]: e.target.checked
                          });
                        }}
                        checked={modalFormData?.completed || false}
                      />
                      Completed
                    </label>
                  </div>
                  <div className="float-right">
                    <button
                      type="submit"
                      className="btn btn-primary mr-2 btn-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary  btn-sm"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Cancle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Task;
