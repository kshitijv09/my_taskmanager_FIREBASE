import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import "./AddTask.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddReminder(props) {
  const { username, currentUser } = useAuth();

  const title = useRef();
  const description = useRef();
  const duedate = useRef();
  const completed = useRef();
  //const createdBy = useRef();

  const dataStoreHandler = async () => {
    //console.log("Username details are", username, " ", typeof username);
    props.onConfirm();
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        Title: title.current.value,
        Description: description.current.value,
        DueDate: duedate.current.value,
        completed: completed.current.value,
        createdBy: currentUser.email /* currentUser.email */,
        collaborators: new Array(currentUser.email),
      });
      console.log(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Modal>
      <div className="add-cont">
        <Form onSubmit={dataStoreHandler}>
          <Form.Group id="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" ref={title} required />
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={description} required />
          </Form.Group>
          <Form.Group id="duedate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" ref={duedate} required />
          </Form.Group>
          <Form.Group id="completed">
            <Form.Label>Completion Status</Form.Label>
            <Form.Control type="text" ref={completed} required />
          </Form.Group>
          {/* <Form.Group id="duedate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="text" ref={duedate} required />
          </Form.Group> */}
          <Button className="w-100" type="submit">
            Create Task
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
