import React, { useState, useEffect, lazy, Suspense } from "react";
import Modal from "../../UI/Modal/Modal";
import "./TaskDetail.css";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./TaskDetail.css";
/* import UpdateTask from "../../components/UpdateTask/UpdateTask"; */
import Loader from "../../components/Loader/Loader";
import ChatBox from "../../components/Comments Section/Chatbox";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactNotifications from "react-notifications-component";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext"; /*...*/

const UpdateTask = lazy(() => import("../../components/UpdateTask/UpdateTask"));
export default function TaskDetail(props) {
  const location = useLocation();
  const task = location.state;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  console.log("Value of task is", task);

  const [valid, isValid] = useState(false);

  const closeHandler = () => {
    navigate("/tasks");
  };
  const delTask = async (id) => {
    console.log("Id being deleted is " + id);
    await deleteDoc(doc(db, "Tasks", id));
    navigate("/tasks");
  };

  const openComment = () => {
    navigate("comments", { state: task.id });
  };

  const checkValidity = () => {
    if (task.createdBy === currentUser.email) {
      isValid(true);
    }
  };

  useEffect(() => {
    checkValidity();
  });
  return (
    <div className="bg-img">
      <div className="page-container">
        <div className="update-container">
          <div className="t1">
            <Suspense fallback={<Loader />}>
              <UpdateTask task={task} />
            </Suspense>
          </div>
        </div>

        <div className="btn-container">
          <Button onClick={openComment} variant="success">
            Comment Section
          </Button>
          <Button onClick={closeHandler} variant="warning">
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              console.log(task.id);
              delTask(task.id);
            }}
            className="del-btn"
            disabled={!valid}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
