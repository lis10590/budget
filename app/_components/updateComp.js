"use client";
import { Modal, FormGroup, Form, Button, CloseButton } from "react-bootstrap";
import { useState, useEffect } from "react";

const UpdateComp = (props) => {
  useEffect(() => {
    setData({
      id: props.input.id,
      category: props.input.category,
      sum: props.input.sum,
      type: props.input.type,
    });
  }, [props.input]);
  const [data, setData] = useState({
    id: "",
    category: "",
    sum: 0,
    type: "",
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onUpdateClick = () => {
    props.update(data);
  };
  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className="flex-direction-column">
        <CloseButton onClick={props.onClose} />
        <Modal.Title>עריכה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup className="text-end mt-2">
          <Form.Label>שם הוצאה</Form.Label>
          <Form.Control
            className="text-end"
            type="text"
            name="category"
            value={data.category}
            onChange={onChangeData}
          />
        </FormGroup>
        <FormGroup className="text-end  mt-2">
          <Form.Label>סכום</Form.Label>
          <Form.Control
            className="text-end"
            type="number"
            name="sum"
            value={data.sum}
            onChange={onChangeData}
          />
        </FormGroup>
        <div className="d-flex justify-content-center mt-3">
          <Button onClick={onUpdateClick}>עדכן</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateComp;
