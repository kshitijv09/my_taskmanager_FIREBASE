import React, { useRef, useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import "./UpdateTask.css";

export default function UpdateTask({ task }) {
  const [title, setTitle] = useState(task.Title);
  const [desc, setDesc] = useState(task.Description);
  const [duedate, setDueDate] = useState(task.DueDate);
  const [completed, setCompletion] = useState(task.completed);
  const [collab, setCollaborator] = useState("");

  const [collaborator, isCollaborator] = useState(false);
  const [creator, isCreator] = useState(false);

  const { currentUser } = useAuth();

  const checkCreator = () => {
    if (currentUser.email === task.createdBy) isCreator(true);
    console.log("For Creator", currentUser.email === task.createdBy);
  };
  const checkCollaborator = () => {
    for (var i in task.collaborators) {
      console.log("i=", i);
      console.log("user", currentUser.email);
      console.log("For collab", task.collaborators[i] === currentUser.email);
      if (task.collaborators[i] === currentUser.email) {
        isCollaborator(true);

        break;
      }
      // console.log("For Collaborator", collaborator);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(duedate);
    console.log(task.createdBy);
    const singleTask = doc(db, "Tasks", task.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(singleTask, {
      Title: title,
      Description: desc,
      DueDate: duedate,
      completed: completed,
    });
  };
  useEffect(() => {
    checkCreator();
    checkCollaborator();
  }, []);

  const addCollaborator = async (event) => {
    event.preventDefault();
    console.log("Collab", collab);
    alert(`${collab} has been added as a Collaborator.
    Collaborators can only update tasks.
    Only creators can add collaborators or delete tasks`);
    const newTask = doc(db, "Tasks", task.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(newTask, {
      collaborators: arrayUnion(collab),
    });
  };

  return (
    <>
      <div className="add-container up-container">
        <div className="title">
          <h1> Update Task</h1>
        </div>
        <Form onSubmit={updateHandler}>
          <Form.Group id="title">
            <Form.Label className="head">Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="description">
            <Form.Label className="head">Description</Form.Label>
            <Form.Control
              type="text"
              value={desc}
              required
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="duedate">
            <Form.Label className="head">Due Date</Form.Label>
            <Form.Control
              type="date"
              value={duedate}
              required
              onChange={(event) => {
                setDueDate(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="completed">
            <Form.Label className="head">Completion Status</Form.Label>
            <Form.Control
              type="text"
              value={completed}
              required
              onChange={(event) => {
                setCompletion(event.target.value);
              }}
            />
          </Form.Group>
          <div className="btn-container">
            <Button className="btn" type="submit" disabled={!collaborator}>
              Update Task
            </Button>
          </div>
        </Form>
      </div>
      <div className="add-container col-container">
        <div className="title">
          <h1> Add Collaborator</h1>
        </div>
        <Form onSubmit={addCollaborator}>
          <Form.Group id="collaborator">
            <Form.Label>Collaborator E-Mail Id</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(event) => {
                setCollaborator(event.target.value);
              }}
            />
          </Form.Group>
          <div className="btn-container">
            <Button type="submit" disabled={!creator} className="btn heading">
              Add
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
