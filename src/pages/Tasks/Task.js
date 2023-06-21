import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import AddTask from "../../components/AddTask/AddTask";

/* import TaskCard from "../../components/TaskCard/TaskCard"; */
import Nav from "../../components/Nav/Nav";
import Loader from "../../components/Loader/Loader";
import "./Task.css";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useAuth } from "../../context/AuthContext";

const TaskCard = lazy(() => import("../../components/TaskCard/TaskCard"));

export default function Reminder() {
  const { currentUser, username } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [tasks2, setTasks2] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState("DueDate");

  const [singleTask, setSingleTask] = useState();

  const modalHandler = () => {
    setModal((prevValue) => {
      return !prevValue;
    });
  };

  const sortingHandler = (category) => {
    setSelectedButton(category);
    if (category === "Status") {
      var arr = [...tasks2];
      arr.sort(
        (a, b) =>
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          a.completed.length - b.completed.length
      );
      //console.log(arr);
      setTasks2(arr);
      console.log("T2 is", tasks2);
    } else if (category === "DueDate") {
      console.log(category);
      var arr = [...tasks2];
      arr.sort(
        (a, b) =>
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          new Date(a.DueDate) - new Date(b.DueDate)
      );
      //console.log(arr);
      setTasks2(arr);
      console.log("T2 is", tasks2);
    }
  };

  const fetchTasks = async () => {
    //console.log(currentUser);
    const collectionRef = collection(db, "Tasks");
    const unsubscribe = await onSnapshot(collectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData.sort(
        (a, b) =>
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          new Date(a.DueDate) - new Date(b.DueDate)
      );

      setTasks(newData);
      setTasks2(newData);
      return () => unsubscribe();
    });
    /* var arr=tasks;
    arr.sort((a,b)=>
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      b.DueDate - a.DueDate); */
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tasks2 is", tasks2);
  }, [tasks2]);

  return (
    currentUser && (
      <div className="img-cont">
        {console.log("In Tasks is", username)}
        {<Nav name={currentUser.email} />}
        {modal && <AddTask onConfirm={modalHandler} />}

        <div className="rem-container">
          <div className="sorting">
            <div
              className="sort-btn"
              id={selectedButton === "DueDate" ? "selected-btn" : ""}
              onClick={() => {
                sortingHandler("DueDate");
              }}
            >
              DueDate
            </div>
            <div
              className="sort-btn"
              id={selectedButton === "Status" ? "selected-btn" : ""}
              onClick={() => {
                sortingHandler("Status");
              }}
            >
              Status
            </div>
          </div>
          <div className="task-heading">
            <div style={{ width: "18%" }} className="task-head">
              Title
            </div>
            <div style={{ width: "18%" }} className="task-head">
              Description
            </div>
            <div style={{ width: " 18%" }} className="task-head">
              Due Date
            </div>
            <div style={{ width: " 18%" }} className="task-head ">
              Status
            </div>
            <div style={{ width: "18%" }} className="task-head " id="creator">
              Created By
            </div>
          </div>

          <div className="display-reminder">
            {/* {console.log("While rendering", tasks2)} */}
            {tasks2.map((task, key) => (
              <Suspense fallback={<Loader />}>
                <TaskCard task={task} />
              </Suspense>
            ))}
          </div>

          <div className="add-rem">
            <button onClick={modalHandler} className="rem-btn">
              Add TASK
            </button>
          </div>
        </div>
      </div>
    )
  );
}
