import React, { useState, useRef } from "react";
import "./TaskCard.css";
import TaskDetail from "../../pages/TaskDetail/TaskDetail";
import { Link, useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  //const [taskdetailModal, setTaskDetailModal] = useState(false);
  const navigate = useNavigate();

  const taskDetailModalHandler = () => {
    //console.log("Task is", task);
    //setSingleTask(task);
    /*  setTaskDetailModal((prevValue) => {
      return !prevValue;
    }); */
    console.log("IN card ", task);
    navigate(`/tasks/${task.id}`, { state: task });
  };

  return (
    <>
      <div className="rem-card" onClick={taskDetailModalHandler}>
        <div style={{ width: "18%" }} className="task-prop">
          {task.Title}
        </div>
        <div style={{ width: "18%" }} className="task-prop">
          {task.Description.substring(0, 12)}...
        </div>

        <div style={{ width: "18%" }} className="task-prop">
          {task.DueDate}{" "}
        </div>
        <div style={{ width: "18%" }} className="task-prop">
          {task.completed}{" "}
        </div>
        <div style={{ width: "18%" }} className="task-prop" id="creator">
          {task.createdBy}{" "}
        </div>
      </div>
    </>
  );
}
