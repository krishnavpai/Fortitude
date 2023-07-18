import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function EditModal({
  content,
  state,
  changeState,
  modalTitle,
  handleSubmit,
}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(content.title || "");
  const [body, setBody] = useState(content.body || "");

  const handleClose = () => {
    changeState(false);
    setShow(false);
  };

  const handleChange = (e) => {
    const type = e.target.getAttribute("data");
    if (type == "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };
  const handleShow = () => setShow(true);

  const modalSubmit = () => {
    console.log(content);
    handleSubmit({
      title,
      body,
      pid: content.pid || null,
    });
    handleClose();
  };

  useEffect(() => {
    if (state == show) return;
    setShow(state);
  }, [state]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle ? modalTitle : "Edit Journal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                data="title"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                data="body"
                value={body}
                rows={5}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={modalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
